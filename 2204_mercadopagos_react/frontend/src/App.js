import axios from 'axios';
import './App.css';

export const mercadopago = new window.MercadoPago(process.env.PUBLIC_TOKEN, {
  locale: 'es-CO',
});

const preferences = {
  items: [
    {
      id: 0,
      title: 'Un producto muy bueno',
      description: 'Cura lo que sea',
      picture_url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg',
      category_id: 'home',
      quantity: 10,
      currency_id: 'COP',
      unit_price: 10000,
    },
  ],
  // additional_info: 'Información adicional sobre el producto',
  // auto_return: 'all',
  back_urls: {
    success: 'http://localhost:3000/success',
    pending: 'http://localhost:3000/pending',
    failure: 'http://localhost:3000/failure',
  },
  // date_of_expiration: ''
  // differential_pricing: {},
  // expiration_date_from: 'AAAA-MM-DD-HH-MM-SS',
  // expiration_date_to: 'AAAA-MM-DD-HH-MM-SS',
  // expires: true,
  // marketplace: '',
  // marketplace_fee: 10,
  /* metadata: {
    loquesea: 'loquesea',
  }, */
  // notification_url: '',
  /* payer: {
    name: 'Pepito',
    surname: 'Perez',
    email: 'pepito@test.com',
    phone: {
      area_code: '+57',
      number: 3285483,
    },
    identification: {
      type: 'CC',
      number: '23487534',
    },
    addess: {
      zip_code: '05322',
      street_name: 'Carrera',
      street_number: '12',
    },
    // date_created:
  }, */
  // payment_methods: {
  //   excluded_payment_methods: [],
  //   excluded_payment_types: [],
  //   default_payment_method_id: '',
  //   installments: 12,
  //   default_installments: 1,
  // }
  // shipments: {},
  // statement_descriptor: '',
  // tracks: []
}

function App() {
  async function handlePayment() {
    const { data: { preferenceId } } = await axios({
      method: 'POST',
      baseURL: 'http://localhost:8000',
      url: '/payments/create-preference',
      data: preferences,
    });

    const checkout = mercadopago.checkout({
      preference: { id: preferenceId },
    });

    checkout.open();
  }

  return (
    <div className="App">
      <div className="payment"></div>
      <button
        type="button"
        onClick={handlePayment}
      >
        Ir a Pago
      </button>
    </div>
  );
}

export default App;
