import React, { useState, useEffect } from "react";
import leadsData from "../../data/leadsData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Leads = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const usersPerPage = 7;

  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentLeads = leadsData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(leadsData.length / usersPerPage);

  const amount = 500;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    e.preventDefault();

    try {
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

      if (!response.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const order = await response.json();
      console.log(order);

      var options = {
        key: "rzp_test_49G8N3nbVhELRI",
        amount,
        currency,
        name: "SmallBigGrowth",
        description: "Business Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };

          const validateRes = await fetch(
            // "http://localhost:4000/order/validate"
            "https://lead-app-wz8g.onrender.com/order/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.json();
          console.log(jsonRes);

          if (jsonRes.msg === "Payment success") {
            setIsPaid(true);
            toast.success("Payment successful");
          } else {
            toast.error("Payment validation failed");
          }
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9860430009",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        toast.error(response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error in payment handler:", error);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <nav className="bg-blue-500 w-full px-4 py-3 flex justify-between items-center shadow-md">
        <div className="text-white text-2xl font-bold">SmallBigGrowth</div>
        <div className="flex items-center gap-8">
          {email && (
            <div className="text-white text-md hidden md:block">
              <strong>{email}</strong>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {!isPaid && (
        <button
          onClick={paymentHandler}
          className="mb-6 mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          Pay to Reveal Emails
        </button>
      )}

      <div className="w-full flex flex-wrap gap-4 justify-center">
        {currentLeads.map((lead, index) => (
          <div
            key={index}
            className="bg-white w-[20%] p-6 mb-4 mt-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl  font-semibold">
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
                onClick={() => toast.error(" Pay to Reveal Emails")}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Reveal Email
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8 w-full max-w-4xl mx-auto">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
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
