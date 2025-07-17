// Low-level module - concrete implementation
class NotificationService {

  sendNotification(email: string, message: string) {
    // Email notification logic
    console.log(`Sending email to ${email}: ${message}`);
  }
}

// High-level module that violates DIP by depending on concrete class
const OrderComponent = () => {
  // Directly instantiating concrete class - DIP violation
  const notificationService = new NotificationService();

  const handleOrderSubmit = () => {
    const email = "user@example.com";
    const message = "Your order has been processed!";
    
    // Directly calling concrete implementation
    notificationService.sendNotification(email, message);
  };

  return (
    <div>
      <h2>Order Processing</h2>
      <button onClick={handleOrderSubmit}>
        Submit Order
      </button>
    </div>
  );
};

export default OrderComponent;