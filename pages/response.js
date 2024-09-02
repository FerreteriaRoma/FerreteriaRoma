// pages/response.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const Response = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTransactionData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const refPayco = queryParams.get('ref_payco');
      const transactionId = queryParams.get('x_transaction_id');
      const amount = queryParams.get('x_amount');
      const currencyCode = queryParams.get('x_currency_code');
      const signature = queryParams.get('x_signature');

      if (refPayco && transactionId && amount && currencyCode && signature) {
        const url = `/api/confirmation`;

        const data = {
          x_ref_payco: refPayco,
          x_transaction_id: transactionId,
          x_amount: amount,
          x_currency_code: currencyCode,
          x_signature: signature,
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        setStatus(result.status);
        setMessage(result.message);

        if (result.status === 'success') {
          setTransactionData({
            x_id_invoice: refPayco,
            x_transaction_date: new Date().toLocaleString(),
            x_response: 'Aceptada',
            x_response_reason_text: 'Transacción exitosa',
            x_bank_name: 'Banco Ejemplo',
            x_transaction_id: transactionId,
            x_amount: amount,
            x_currency_code: currencyCode,
          });
        } else {
          setError(result.message);
        }
      } else {
        setError('Faltan parámetros necesarios.');
      }
    };

    fetchTransactionData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!transactionData) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Head>
        <title>Respuesta de la Transacción</title>
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </Head>
      <header id="main-header" style={{ marginTop: '20px' }}>
        <div className="row">
          <div className="col-lg-12 franja">
            <img
              className="center-block"
              src='/img/LogoFondo.png'
              alt="logo"
            />
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-lg-8 col-lg-offset-2">
            <h4 style={{ textAlign: 'left' }}>Respuesta de la Transacción</h4>
            <hr />
          </div>
          <div className="col-lg-8 col-lg-offset-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Referencia</td>
                    <td>{transactionData.x_id_invoice}</td>
                  </tr>
                  <tr>
                    <td className="bold">Fecha</td>
                    <td>{transactionData.x_transaction_date}</td>
                  </tr>
                  <tr>
                    <td>Respuesta</td>
                    <td>{transactionData.x_response}</td>
                  </tr>
                  <tr>
                    <td>Motivo</td>
                    <td>{transactionData.x_response_reason_text}</td>
                  </tr>
                  <tr>
                    <td className="bold">Banco</td>
                    <td>{transactionData.x_bank_name}</td>
                  </tr>
                  <tr>
                    <td className="bold">Recibo</td>
                    <td>{transactionData.x_transaction_id}</td>
                  </tr>
                  <tr>
                    <td className="bold">Total</td>
                    <td>{`${transactionData.x_amount} ${transactionData.x_currency_code}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="row">
          <div className="container">
            <div className="col-lg-8 col-lg-offset-2">
              <img
                src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/pagos_procesados_por_epayco_260px.png"
                alt="Epayco logo"
                style={{ marginTop: '10px', float: 'left' }}
              />
              <img
                src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/credibancologo.png"
                height="40px"
                alt="Credibanco logo"
                style={{ marginTop: '10px', float: 'right' }}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Response;
