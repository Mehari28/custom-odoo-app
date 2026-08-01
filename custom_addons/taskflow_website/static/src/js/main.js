/** @odoo-module **/

console.log("TaskFlow JS Loaded");


document.addEventListener(
    "DOMContentLoaded",
    function () {


        const buttons =
            document.querySelectorAll(
                ".service-btn"
            );


        const contents =
            document.querySelectorAll(
                ".service-content"
            );



        console.log(
            "Buttons found:",
            buttons.length
        );


        console.log(
            "Contents found:",
            contents.length
        );



        if (
            buttons.length === 0 ||
            contents.length === 0
        ) {

            console.log(
                "No services found"
            );

            return;

        }





        /*
            Default first service active
        */


        buttons[0].classList.add(
            "active"
        );


        contents[0].classList.add(
            "active"
        );





        /*
            Service switching
        */


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





                        /*
                            Remove active states
                        */


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






                        /*
                            Activate selected button
                        */


                        this.classList.add(
                            "active"
                        );





                        /*
                            Show selected content
                        */


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
                                "Content not found for:",
                                serviceId
                            );


                        }



                    }
                );


            }
        );



    }
);