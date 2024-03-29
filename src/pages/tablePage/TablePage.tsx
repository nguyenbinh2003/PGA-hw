import { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { Button } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import ProductSevices from "@/src/services/product/productSevices";
import { IProduct } from "@/src/interfaces/table-interface";
import {
  handleFormatDate,
  formatUSCurrency,
  reformatString,
  formatColor,
} from "@/src/utils/format/format";
import ModalDelete from "@/src/modals/ModalDelete";
import ModalCreateProduct from "@/src/modals/ModalCreateProduct";
import ModalViewDetail from "@/src/modals/ModalViewDetail";

const ProductSevice = new ProductSevices();

export default function TablePage() {
  const [isShowModalCreate, setIsShowModalCreate] = useState<boolean>(false);
  const [isShowDetail, setShowDetail] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [objModal, setObjModal] = useState({
    show: false,
    idProduct: NaN,
  });

  const getProduct = async () => {
    const products: any = await ProductSevice.getProduct();

    if (products.code < 400) setData(products.data);
    else {
      console.error("can't get products");
    }
  };
  const handleDeleteProduct = async (id: number) => {
    const deleted: any = await ProductSevice.deleteProduct(id);
    if (deleted.code > 400) console.error("something wrong");
    else {
      getProduct();
      return;
    }
  };
  const getProductDetail = async (id: number) => {
    const detail: any = await ProductSevice.getProductDetail(id);
    if (detail.code < 400) setDataDetail(detail.data);
  };

  const handleShow = (id: number) => setObjModal({ show: true, idProduct: id });
  const handleClose = () => setObjModal({ show: false, idProduct: NaN });

  const handleShowDetail = () => setShowDetail(true);
  const handleCloseDetail = () => setShowDetail(false);

  useEffect(() => {
    getProduct();
  }, []);

  const dataFilterCurrency = data?.map((data) => {
    return { text: data.currency, value: data.currency };
  });
  const dataFilterClient = data?.map((data) => {
    return { text: data.client, value: data.client };
  });

  const columns: TableProps<IProduct>["columns"] = [
    {
      title: <h4>Status</h4>,
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: "PENDING",
          value: "PENDING",
        },
        {
          text: "PROCESSING",
          value: "PROCESSING",
        },
        {
          text: "FULFILLED",
          value: "FULFILLED",
        },
        {
          text: "RECEIVED",
          value: "RECEIVED",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record: any): boolean =>
        record.status.startsWith(value),
      width: "30%",
      render: (_, { status }) => (
        <h6 className={formatColor(status || "")}>{status}</h6>
      ),
    },
    {
      title: <h4>Date</h4>,
      key: "date",
      dataIndex: "updatedAt",
      sorter: (a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt),
      render: (_, { updatedAt }) => <>{handleFormatDate(updatedAt || "")}</>,
    },
    {
      title: <h4>Client</h4>,
      key: "client",
      dataIndex: "client",
      filters: [
        ...new Set(dataFilterClient.map((obj) => JSON.stringify(obj))),
      ].map((json) => JSON.parse(json)),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record: any): boolean =>
        record.client.startsWith(value),
    },
    {
      title: <h4>Currency</h4>,
      key: "currency",
      dataIndex: "currency",
      filters: [
        ...new Set(dataFilterCurrency.map((obj) => JSON.stringify(obj))),
      ].map((json) => JSON.parse(json)),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record: any): boolean =>
        record.currency.startsWith(value),
    },
    {
      title: <h4>Total</h4>,
      key: "total",
      dataIndex: "total",
      sorter: (a, b) => a.total - b.total,
      render: (_, { total }) => <>{formatUSCurrency(total || NaN)}</>,
    },
    {
      title: <h4>Invoice #</h4>,
      key: "invoice",
      dataIndex: "invoice",
      render: (_, { invoice }) => (
        <>{reformatString(invoice || "#qweqweoi123")}</>
      ),
    },
    {
      title: <h4>Action</h4>,
      key: "action",
      render: (_, { id }) => (
        <div className="d-flex justify-content-start align-items-center">
          <Button
            variant="primary"
            onClick={() => {
              handleShowDetail();
              getProductDetail(id);
            }}
          >
            View Details
          </Button>

          <button
            className="btn btn-outline-danger rounded-circle ms-4"
            style={{ padding: "7px 11px" }}
            onClick={() => handleShow(id)}
          >
            <FaRegTrashAlt className="pb-1" size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-12 mb-4 d-flex justify-content-end">
        <Button variant="primary" onClick={() => setIsShowModalCreate(true)}>
          Create A Product
        </Button>
      </div>
      <div>
        <Table
          dataSource={data}
          columns={columns}
          bordered
          pagination={{ pageSize: 6 }}
        />
        <ModalDelete
          obj={objModal}
          handleClose={handleClose}
          handleDeleteProduct={handleDeleteProduct}
        />
        <ModalCreateProduct
          getProduct={getProduct}
          isShowModalCreate={isShowModalCreate}
          setIsShowModalCreate={setIsShowModalCreate}
        />
        <ModalViewDetail
          isShowDetail={isShowDetail}
          handleCloseDetail={handleCloseDetail}
          getProduct={getProduct}
          dataDetail={dataDetail}
        />
      </div>
    </div>
  );
}
