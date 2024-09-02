import { NextResponse } from 'next/server';

export async function POST(req) {
  const { x_ref_payco, x_transaction_id, x_amount, x_currency_code, x_signature } = await req.json();
  console.log('Datos recibidos en la API:', { x_ref_payco, x_transaction_id, x_amount, x_currency_code, x_signature });

  const p_cust_id_cliente = '1493107'; // Reemplaza con tu ID de cliente
  const p_key = 'b7388587d565fb2e7df8c0cf79bf0cd852613208'; // Reemplaza con tu clave

  // Generar la firma esperada
  const signature = hash('sha256', `${p_cust_id_cliente}^${p_key}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`);
  console.log('Firma generada:', signature);

  // Validar firma
  if (x_signature === signature) {
    return NextResponse.json({ status: 'success', message: 'Transacción confirmada' });
  } else {
    return NextResponse.json({ status: 'error', message: 'Firma no válida' });
  }
}

// Función de hash simple
function hash(algorithm, data) {
  const crypto = require('crypto');
  return crypto.createHash(algorithm).update(data).digest('hex');
}
