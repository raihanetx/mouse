const nextStepBtns = document.querySelectorAll('.next-step-btn');
const steps = document.querySelectorAll('.step');
const shippingDetails = document.querySelector('.shipping-details');
const paymentDetails = document.querySelector('.payment-details');
const orderConfirmation = document.querySelector('.order-confirmation');

let currentStep = 0;

nextStepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
        }

        if (currentStep === 1) {
            shippingDetails.style.display = 'none';
            paymentDetails.style.display = 'block';
        } else if (currentStep === 2) {
            paymentDetails.style.display = 'none';
            orderConfirmation.style.display = 'block';
        }
    });
});
