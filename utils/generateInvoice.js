const easyinvoice = require('easyinvoice');
const Cart = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.generateInvoice = async (order, req, res) => {
  try {
    const usid = order.userId;
    const shippingAddress = order.address;
    if (!shippingAddress) {
      throw new Error("Shipping address not found in the cart");
    }

    const userName = shippingAddress.firstname;
    const orderCreatedAt = order.createdAt;
    const newDate = new Date(orderCreatedAt);
    newDate.setDate(newDate.getDate() + 7);
    const dueDate = newDate.toLocaleDateString();

    const createdAtString = order.createdAt.toString();
    const createdDate = createdAtString.split("T")[0];

    const products = await Promise.all(
      order.products.item.map(async (product) => {
        try {
          const items = await Product.findById(product.productId);
          const proName = await Product.findById({ _id: product.productId });
          return {
            quantity: product.qty,
            description: proName.name,
            price: items.price,
          };
        } catch (error) {
          console.error('Error fetching product details:', error);
          throw error;
        }
      })
    );

    const invoiceData = {
      documentTitle: `Invoice-${order.orderID}`,
      currency: 'INR',
      taxNotation: 'GST',
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: 'https://drive.google.com/uc?export=view&id=1H1NvW8zef4y3xAbPnUiL_q2G_mXpERRj',
      background: 'https://drive.google.com/uc?export=view&id=1HI0YWbWVdABbGRhk9O0RFSD94CASqP8l',
      sender: {
        company: 'BIG SHOPY',
        address: 'Dotspace Kazhakoottam',
        city: 'Trivandrum, Kerala',
        zip: '691541',
        country: 'India',
      },
      client: {
        company: `Ship To ${userName}`,
        address: `${shippingAddress.address}`,
        zip: `${shippingAddress.zipCode}`,
        city: `${shippingAddress.city} ${shippingAddress.state}`,
      },
      information: {
        number: order.invoiceNumber,
        date: createdDate,
        'due-date': dueDate
      },
      invoiceNumber: order.invoiceNumber,
      invoiceDate: createdDate,
      products,
      bottomNotice: 'Thank you For shopping with us.',
    };

    const pdfData = await easyinvoice.createInvoice(invoiceData);

    // Set the appropriate headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="invoice-${order.orderID}.pdf"`
    );

    // Send the PDF data to the client
    res.end(Buffer.from(pdfData.pdf, 'base64'));
  } catch (error) {
    console.error("Failed to generate invoice:", error);
    throw error;
  }
};
