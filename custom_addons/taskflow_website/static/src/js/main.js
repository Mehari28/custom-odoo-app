/** @odoo-module **/

console.log("TaskFlow JS Loaded");

function animateCounters() {

    const counters =
        document.querySelectorAll(".counter");


    console.log(
        "Counter elements found:",
        counters.length
    );


    counters.forEach(
        function(counter) {


            const target =
                Number(
                    counter.dataset.target
                );


            let current = 0;


            const increment =
                Math.ceil(
                    target / 100
                );


            function update() {


                current += increment;


                if (current >= target) {

                    counter.innerText = target;

                } else {

                    counter.innerText = current;

                    requestAnimationFrame(update);

                }

            }


            update();


        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
        ======================================
        SERVICE TAB SWITCHING
        ======================================
        */


        const buttons =
            document.querySelectorAll(
                ".service-btn"
            );


        const contents =
            document.querySelectorAll(
                ".service-content"
            );


        console.log(
            "Service buttons found:",
            buttons.length
        );


        console.log(
            "Service contents found:",
            contents.length
        );



        if (
            buttons.length > 0 &&
            contents.length > 0
        ) {


            buttons[0].classList.add(
                "active"
            );


            contents[0].classList.add(
                "active"
            );



            buttons.forEach(
                function(button) {


                    button.addEventListener(
                        "click",
                        function () {


                            const serviceId =
                                this.dataset.service;



                            console.log(
                                "Clicked service:",
                                serviceId
                            );



                            buttons.forEach(
                                function(btn) {

                                    btn.classList.remove(
                                        "active"
                                    );

                                }
                            );



                            contents.forEach(
                                function(content) {

                                    content.classList.remove(
                                        "active"
                                    );

                                }
                            );



                            this.classList.add(
                                "active"
                            );



                            const selectedContent =
                                document.getElementById(
                                    serviceId
                                );



                            if (selectedContent) {


                                selectedContent.classList.add(
                                    "active"
                                );


                            } else {


                                console.log(
                                    "Content not found:",
                                    serviceId
                                );


                            }


                        }
                    );


                }
            );


        }





        /*
        ======================================
        FAQ ACCORDION
        ======================================
        */


        const faqButtons =
            document.querySelectorAll(
                ".faq-question"
            );



        console.log(
            "FAQ buttons found:",
            faqButtons.length
        );



        faqButtons.forEach(
            function(button) {


                button.addEventListener(
                    "click",
                    function () {


                        const faqItem =
                            this.closest(
                                ".faq-item"
                            );



                        if (faqItem) {


                            faqItem.classList.toggle(
                                "active"
                            );



                            console.log(
                                "FAQ toggled"
                            );


                        }


                    }
                );


            }
        );





        /*
        ======================================
        COUNTER ANIMATION
        ======================================
        */


        const counters =
            document.querySelectorAll(
                ".counter"
            );


        console.log(
            "Counters found:",
            counters.length
        );



        counters.forEach(
            function(counter) {


                const target =
                    Number(
                        counter.dataset.target
                    );


                let current = 0;


                const increment =
                    Math.ceil(
                        target / 80
                    );



                function updateCounter() {


                    current += increment;



                    if (current >= target) {


                        counter.innerText =
                            target;


                    } else {


                        counter.innerText =
                            current;


                        requestAnimationFrame(
                            updateCounter
                        );


                    }


                }



                updateCounter();


            }
        );



    }
);

animateCounters();