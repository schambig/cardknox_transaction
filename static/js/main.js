document.addEventListener("DOMContentLoaded", function(event) { 
    let defaultStyle = {
        border: '1px solid black',
        'font-size': '14px',
        padding: '3px',
        width: '350px',
        height: '30px',
        borderRadius: '5px'
    };
                    
    let validStyle = {
        border: '1px solid green',
        'font-size': '14px',
        padding: '3px',
        width: '350px',
        height: '30px'
    };   
  
    let invalidStyle = {
        border: '1px solid red',
        'font-size': '14px',
        padding: '3px',
        width: '350px',
        height: '30px'
    };
  
    enableAutoSubmit('payment-form');
  
    enable3DS('amount', 'month', 'year', true, 20000);
  
    setIfieldStyle('ach', defaultStyle);
    setIfieldStyle('card-number', defaultStyle);
    setIfieldStyle('cvv', defaultStyle);
  
    setAccount('ifieldssamplekey_7e133696ce254383824cdff436c50c7b', 'iFields_Sample_Form', '1.0');
  
    enableAutoFormatting();
  
     addIfieldCallback('input', function(data) {
        if (data.ifieldValueChanged) {
            setIfieldStyle('card-number', data.cardNumberFormattedLength <= 0 ? defaultStyle : data.cardNumberIsValid ? validStyle : invalidStyle);
            if (data.lastIfieldChanged === 'cvv'){
                setIfieldStyle('cvv', data.issuer === 'unknown' || data.cvvLength <= 0 ? defaultStyle : data.cvvIsValid ? validStyle : invalidStyle);
            } else if (data.lastIfieldChanged === 'card-number') {
                if (data.issuer === 'unknown' || data.cvvLength <= 0) {
                    setIfieldStyle('cvv', defaultStyle);
                } else if (data.issuer === 'amex'){
                    setIfieldStyle('cvv', data.cvvLength === 4 ? validStyle : invalidStyle);
                } else {
                    setIfieldStyle('cvv', data.cvvLength === 3 ? validStyle : invalidStyle);
                }
            } else if (data.lastIfieldChanged === 'ach') {
                setIfieldStyle('ach',  data.achLength === 0 ? defaultStyle : data.achIsValid ? validStyle : invalidStyle);
            }
        }
    });
  
    let checkCardLoaded = setInterval(function() {
        clearInterval(checkCardLoaded);
        focusIfield('card-number');
    }, 1000);
  
    document.getElementById('clear-btn').addEventListener('click', function(e){
        e.preventDefault();
        clearIfield('card-number');
        clearIfield('cvv');
        clearIfield('ach');
    });
  
    document.getElementById('payment-form').addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('transaction-status').innerHTML = 'Processing Transaction...';
        let submitBtn = this;
        submitBtn.disabled = true;
        getTokens(function() { 
                document.getElementById('transaction-status').innerHTML  = '';
                document.getElementById('ach-token').innerHTML = document.querySelector("[data-ifields-id='ach-token']").value;
                document.getElementById('card-token').innerHTML = document.querySelector("[data-ifields-id='card-number-token']").value;
                document.getElementById('cvv-token').innerHTML = document.querySelector("[data-ifields-id='cvv-token']").value;
                submitBtn.disabled = false;
            },
            function() {
                document.getElementById('transaction-status').innerHTML = '';
                document.getElementById('ach-token').innerHTML = '';
                document.getElementById('card-token').innerHTML = '';
                document.getElementById('cvv-token').innerHTML = '';
                submitBtn.disabled = false;
            },
            30000
          );
  
        const xCardNum = document.getElementById('card-number').value;
        const xExp = document.getElementById('month').value + document.getElementById('year').value;
        const xAmount = document.getElementById('amount').value;
        const xCVV = document.getElementById('cvv-token').value;
  
        const example_payload = {
          xCardNum : xCardNum,
          xExp : xExp,
          xAmount : xAmount,
          xCVV : xCVV,
        }
  
        console.log(example_payload)
  
        fetch('/authonly', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(example_payload)
        })
        .then(Response => Response.json())
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.error(err)
      });
    });
  });