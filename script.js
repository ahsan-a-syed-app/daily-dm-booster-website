document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const action = form.getAttribute('action');

        fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset();
                formMessage.textContent = 'Thank you for signing up!';
                formMessage.style.color = '#4CAF50';
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formMessage.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    formMessage.style.color = '#f44336';
                })
            }
        }).catch(error => {
            formMessage.textContent = 'Oops! There was a problem submitting your form.';
            formMessage.style.color = '#f44336';
        });
    });
});