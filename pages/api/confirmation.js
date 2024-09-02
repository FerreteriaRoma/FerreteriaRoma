import crypto from 'crypto';

export async function handler(req, res) {
  if (req.method === 'POST') {
    const { x_ref_payco, x_transaction_id, x_amount, x_currency_code, x_signature } = req.body;

    const p_cust_id_cliente = '1493107'; // Reemplaza con tu ID de cliente
    const p_key = 'b7388587d565fb2e7df8c0cf79bf0cd852613208'; // Reemplaza con tu clave

    if (!x_ref_payco || !x_transaction_id || !x_amount || !x_currency_code || !x_signature) {
      return res.status(400).json({ status: 'error', message: 'Faltan parámetros necesarios' });
    }

    // Generar la firma esperada
    const signature = generateSignature(p_cust_id_cliente, p_key, x_ref_payco, x_transaction_id, x_amount, x_currency_code);

    // Validar firma
    if (x_signature === signature) {
      // Aquí puedes hacer la lógica para guardar la transacción en tu base de datos
      return res.status(200).json({ status: 'success', message: 'Transacción confirmada' });
    } else {
      return res.status(400).json({ status: 'error', message: 'Firma no válida' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Función para generar la firma esperada
function generateSignature(p_cust_id_cliente, p_key, x_ref_payco, x_transaction_id, x_amount, x_currency_code) {
  const data = `${p_cust_id_cliente}^${p_key}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

export default handler;
