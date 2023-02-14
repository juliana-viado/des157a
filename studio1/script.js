(function(){
    "use strict";
    console.log('JS Running');

    const button = document.querySelector('#sent');
    const madlib = document.querySelector('#madlib');
    const back = document.querySelector('.message-nav-left')

    button.addEventListener('click', function(event){
        event.preventDefault();
        
        const fname = document.querySelector('#fname').value;
        const num = document.querySelector('#num').value;
        const num2 = document.querySelector('#num2').value;
        const adj1 = document.querySelector('#adj1').value;
        const noun = document.querySelector('#noun').value;

        let myText;
        let bestieText;

        if (fname=='' || fname== null){
            alert("Please provide a name");
            document.querySelector('#fname').focus();
        } else if (num =='' || num == null){
            alert("Please provide a number");
            document.querySelector('#num').focus();
        } else if (num2=='' || num2== null){
            alert("Please provide a number");
            document.querySelector('#num2').focus();
        }else if (adj1=='' || adj1 == null ){
            alert("Please provide an adjective");
            document.querySelector('#adj1').focus();
        }else if (noun=='' || noun == null){
            alert("Please provide a plural noun");
            document.querySelector('#noun').focus();
        } else{         
            myText = `<article class="bestie">
            <article class="message-bubble">
                <p>I am! BUT I AM SO TIRED! ${fname}, my ${adj1} roommate would leave the dorm at ${num} in the morning and come back at ${num2}am. I thought they was chillin with a boy or something. Turns out that it's "prime time" to watch ${noun} at the creek by our apartment. I haven't slept a wink</p>
            </article>
            <img src="images/texter.png" alt="profile1">`;

            bestieText = `<article class="bestie">
            <img src="images/bestie.png" alt="profile1">
            <article class="message-bubble">
                <p>That's awful! Next time then!</p>
            </article>`;
        };
        

        setTimeout( function(){
            madlib.innerHTML = myText;
            setTimeout( function(){
                madlib.innerHTML += bestieText;
            }, 5000 )
        }, 1000 );
    });

    back.addEventListener('click', function(event){
        event.preventDefault();
    });

})();
