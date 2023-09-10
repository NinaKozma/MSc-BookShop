import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listReports } from '../actions/reportsActions';
import Meta from '../components/Meta';

const ReportListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const reportsList = useSelector((state) => state.reportsList);
  const { loading, error, reports } = reportsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.JMBG) {
      dispatch(listReports());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Meta title='All Daily Reports' />
      <h1>All Daily Reports</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>REPORT DATE</th>
              <th>ORDERED ITEMS</th>
              <th>TOTAL PRICE</th>
              <th>AVERAGE ORDER SALES</th>
              <th>ALL ORDERS</th>
              <th>PAID ITEMS</th>
              <th>DELIVERED ITEMS</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report._id}</td>
                <td align='center'>{report.numItemsOrdered}</td>
                <td>{Number(report.totalPrice).toFixed(2)} RSD</td>
                <td>{Number(report.averageOrderSales).toFixed(2)} RSD</td>
                <td align='center'>{report.numOrders}</td>
                <td align='center'>{report.numOrdersPaid}</td>
                <td align='center'>{report.numOrdersShipped}</td>
              </tr>
            ))}
            <tr style={{ background: 'grey', color: 'white' }}>
              <td>TOTAL SUM:</td>
              <td align='center'>
                {reports.reduce(
                  (totalNumItemsOrdered, report) =>
                    totalNumItemsOrdered + report.numItemsOrdered,
                  0
                )}
              </td>
              <td>
                {reports
                  .reduce(
                    (sumTotalPrice, report) =>
                      sumTotalPrice + report.totalPrice,
                    0
                  )
                  .toFixed(2)}{' '}
                RSD
              </td>
              <td>
                {(
                  reports.reduce(
                    (avgOrderSales, report) =>
                      report.averageOrderSales + avgOrderSales,
                    0
                  ) / reports.length
                ).toFixed(2)}{' '}
                RSD
              </td>
              <td align='center'>
                {reports.reduce(
                  (totalOrders, report) => totalOrders + report.numOrders,
                  0
                )}
              </td>
              <td align='center'>
                {reports.reduce(
                  (totalPaid, report) => totalPaid + report.numOrdersPaid,
                  0
                )}
              </td>
              <td align='center'>
                {reports.reduce(
                  (totalShipped, report) =>
                    totalShipped + report.numOrdersShipped,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ReportListScreen;
