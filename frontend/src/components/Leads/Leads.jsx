import React, { useState, useEffect } from "react";
import leadsData from "../../data/leadsData"; // JSON with leads data

const Leads = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaid, setIsPaid] = useState(false); // Payment status
  const usersPerPage = 7;

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentLeads = leadsData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(leadsData.length / usersPerPage);

  const amount = 500;
  const currency = "INR";
  const receiptId = "receipt#1";

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Payment Handler
  const paymentHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      // "http://localhost:4000/order"
      "https://lead-app-wz8g.onrender.com/order",
      {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const order = await response.json();

    if (!order || !order.id) {
      alert("Failed to create order. Please try again.");
      return;
    }

    var options = {
      // key ,
      amount: order.amount,
      currency,
      name: "My Company",
      description: "Lead Data Access",
      order_id: order.id, // Razorpay Order ID
      handler: async function (response) {
        const validationData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const validateRes = await fetch(
          // "http://localhost:4000/order/validate",
          "https://lead-app-wz8g.onrender.com/order/validate",
          {
            method: "POST",
            body: JSON.stringify(validationData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const validationResponse = await validateRes.json();
        if (validationResponse.msg === "Payment success") {
          setIsPaid(true); // Set payment status to true
        }
      },
      prefill: {
        name: "Onkar",
        email: "Onkar@example.com",
        contact: "9860430009",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.description);
    });
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Lead List</h1>

      {/* Payment Button */}
      {!isPaid && (
        <button
          onClick={paymentHandler}
          className="mb-6 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          Pay to Reveal Emails
        </button>
      )}

      {/* Lead List */}
      <ul className="w-full max-w-4xl mx-auto">
        {currentLeads.map((lead, index) => (
          <li key={index} className="bg-white p-6 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">
              {lead.firstName} {lead.lastName}
            </h2>
            <p className="text-gray-600">Company: {lead.company}</p>
            <p className="text-gray-600">Job Title: {lead.jobTitle}</p>
            <p className="text-blue-500 underline">
              <a
                href={lead.linkedInProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </p>

            {isPaid ? (
              <p className="mt-4 text-gray-600">Email: {lead.email}</p>
            ) : (
              <button
                onClick={() => alert("Please pay to reveal the email!")}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Reveal Email
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 w-full max-w-4xl mx-auto">
        <button
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : currentPage
            )
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leads;
