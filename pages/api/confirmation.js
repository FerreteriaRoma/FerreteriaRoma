// pages/api/confirmation.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const { x_ref_payco, x_transaction_id, x_amount, x_currency_code, x_signature } = await req.json();
  console.log('Datos recibidos en la API:', { x_ref_payco, x_transaction_id, x_amount, x_currency_code, x_signature });

  // Reemplaza con tus claves de ePayco
  const p_cust_id_cliente = '1493107'; // ID de cliente
  const p_key = 'b7388587d565fb2e7df8c0cf79bf0cd852613208'; // Clave

  // Generar la firma esperada
  const signature = hash('sha256', `${p_cust_id_cliente}^${p_key}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`);

  // Validar firma
  if (x_signature === signature) {
    // Aquí puedes hacer la lógica para guardar la transacción en tu base de datos
    return NextResponse.json({ status: 'success', message: 'Transacción confirmada' });
  } else {
    return NextResponse.json({ status: 'error', message: 'Firma no válida' });
  }
}

// Función de hash simple
function hash(algorithm, data) {
  return crypto.createHash(algorithm).update(data).digest('hex');
}
