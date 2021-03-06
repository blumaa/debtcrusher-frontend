import React, { Component } from 'react'
import { CardElement, Elements, injectStripe } from 'react-stripe-elements'
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { postProjectBacker } from "../store/actions/projectBackers";

// const {
// 	CardElement,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCVCElement,
//   PaymentRequestButtonElement,
//   IbanElement,
//   IdealBankElement,
//   StripeProvider,
//   Elements,
//   injectStripe,
// } = ReactStripeElements;

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
// const handleClick = () => {
//   console.log('[click]');
// };
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends Component {
  state = {
    amount: 0
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => {
          fetch('https://debt-crusher-backend.herokuapp.com/api/stripe/checkout', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              payload: payload,
              amount: this.state.amount
            })
          })
          .then(res=> res.json())
          .then(data => {
            console.log(data)
            if (data.status === 'succeeded') {
              console.log('purchase completed')
            }
          })
        console.log('[token]', payload);
      })
      //
      // this.props.backProject(
      //   this.props.user.currentUser.id,
      //   this.props.project.id,
      //   this.state.amount,
      //   this.props.project.User.id,
      //   this.props.project.stripe_user_id,
      //   this.props.history
      // );


    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    console.log(this.props.location)
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Field>

        Amount:
        <div>
          <input
            type="radio"
            name="amount"
            value="10"
            onChange={this.handleChange}
          />
          <label>$10</label>
        </div>
        <div>
          <input
            type="radio"
            name="amount"
            value="20"
            onChange={this.handleChange}
          />
          <label>$20</label>
        </div>
        <div>
          <input
            type="radio"
            name="amount"
            value="30"
            onChange={this.handleChange}
          />
          <label>$30</label>
        </div>
      </Form.Field>
      <Form.Field>
        <label>
          Card details
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
            required
          />
        </label>
        </Form.Field>
        <Button>Pay</Button>
      </Form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

// class _SplitForm extends React.Component {
//   handleSubmit = (ev) => {
//     ev.preventDefault();
//     if (this.props.stripe) {
//       this.props.stripe
//         .createToken()
//         .then((payload) => console.log('[token]', payload));
//     } else {
//       console.log("Stripe.js hasn't loaded yet.");
//     }
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Card number
//           <CardNumberElement
//             onBlur={handleBlur}
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onReady={handleReady}
//             {...createOptions(this.props.fontSize)}
//           />
//         </label>
//         <label>
//           Expiration date
//           <CardExpiryElement
//             onBlur={handleBlur}
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onReady={handleReady}
//             {...createOptions(this.props.fontSize)}
//           />
//         </label>
//         <label>
//           CVC
//           <CardCVCElement
//             onBlur={handleBlur}
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onReady={handleReady}
//             {...createOptions(this.props.fontSize)}
//           />
//         </label>
//         <button>Pay</button>
//       </form>
//     );
//   }
// }
// const SplitForm = injectStripe(_SplitForm);

// class _PaymentRequestForm extends React.Component {
//   constructor(props) {
//     super(props);
//
//     const paymentRequest = props.stripe.paymentRequest({
//       country: 'US',
//       currency: 'usd',
//       total: {
//         label: 'Demo total',
//         amount: 1000,
//       },
//     });
//
//     paymentRequest.on('token', ({complete, token, ...data}) => {
//       console.log('Received Stripe token: ', token);
//       console.log('Received customer information: ', data);
//       complete('success');
//     });
//
//     paymentRequest.canMakePayment().then((result) => {
//       this.setState({canMakePayment: !!result});
//     });
//
//     this.state = {
//       canMakePayment: false,
//       paymentRequest,
//     };
//   }
//
//   render() {
//     return this.state.canMakePayment ? (
//       <PaymentRequestButtonElement
//         className="PaymentRequestButton"
//         onBlur={handleBlur}
//         onClick={handleClick}
//         onFocus={handleFocus}
//         onReady={handleReady}
//         paymentRequest={this.state.paymentRequest}
//         style={{
//           paymentRequestButton: {
//             theme: 'dark',
//             height: '64px',
//             type: 'donate',
//           },
//         }}
//       />
//     ) : null;
//   }
// }
// const PaymentRequestForm = injectStripe(_PaymentRequestForm);

// class _IbanForm extends React.Component {
//   handleSubmit = (ev) => {
//     ev.preventDefault();
//     if (this.props.stripe) {
//       this.props.stripe
//         .createSource({
//           type: 'sepa_debit',
//           currency: 'eur',
//           owner: {
//             name: ev.target.name.value,
//             email: ev.target.email.value,
//           },
//           mandate: {
//             notification_method: 'email',
//           },
//         })
//         .then((payload) => console.log('[source]', payload));
//     } else {
//       console.log("Stripe.js hasn't loaded yet.");
//     }
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name
//           <input name="name" type="text" placeholder="Jane Doe" required />
//         </label>
//         <label>
//           Email
//           <input
//             name="email"
//             type="email"
//             placeholder="jane.doe@example.com"
//             required
//           />
//         </label>
//         <label>
//           IBAN
//           <IbanElement
//             supportedCountries={['SEPA']}
//             onBlur={handleBlur}
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onReady={handleReady}
//             {...createOptions(this.props.fontSize)}
//           />
//         </label>
//         <button>Pay</button>
//       </form>
//     );
//   }
// }
// const IbanForm = injectStripe(_IbanForm);

// class _IdealBankForm extends React.Component {
//   handleSubmit = (ev) => {
//     ev.preventDefault();
//     if (this.props.stripe) {
//       this.props.stripe
//         .createSource({
//           type: 'ideal',
//           amount: 1099,
//           currency: 'eur',
//           owner: {
//             name: ev.target.name.value,
//           },
//           redirect: {
//             return_url: 'https://example.com',
//           },
//         })
//         .then((payload) => console.log('[source]', payload));
//     } else {
//       console.log("Stripe.js hasn't loaded yet.");
//     }
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name
//           <input name="name" type="text" placeholder="Jane Doe" required />
//         </label>
//         <label>
//           iDEAL Bank
//           <IdealBankElement
//             className="IdealBankElement"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onReady={handleReady}
//             {...createOptions(this.props.fontSize, '10px 14px')}
//           />
//         </label>
//         <button>Pay</button>
//       </form>
//     );
//   }
// }
// const IdealBankForm = injectStripe(_IdealBankForm);

class Checkout extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
  //   };
  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
  //       this.setState({elementFontSize: '14px'});
  //     } else if (
  //       window.innerWidth >= 450 &&
  //       this.state.elementFontSize !== '18px'
  //     ) {
  //       this.setState({elementFontSize: '18px'});
  //     }
  //   });
  // }

  render() {
    // const {elementFontSize} = this.state;
    console.log(this.props.location)
    return (
      <div className="Checkout">
        <h1>This is where you back a project</h1>
        <Elements>
          <CardForm />
        </Elements>
        {/*<Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements>
        <Elements>
          <PaymentRequestForm />
        </Elements>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    projects: state.projects.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    backProject: (backerId, projectId, amount, userId, stripeId, history) =>
      dispatch(postProjectBacker(backerId, projectId, amount, userId, stripeId, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
