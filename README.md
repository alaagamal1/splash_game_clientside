    USED TECHNOLOGIES
    - REACT JS
    - EXPRESS JS
    - MONGODB/MONGOOSE
    - SOCKET.IO
    - FRAMER MOTION
    - LOTTIE

    FLOW EXPLAINATION
    - In the initial page user is required to login or register, 
    - all user details and chat messages are saved on remote mongodb server
    - user level increase everytime he passes 10 enemies.
    - starting from level 2 the user begin to have 2 enemies ( in the same time ) instead of 1 ( game becomes harder )


    HOW THE GAME WORKS
    1- on initial page load, the "client-side" send requiest to the "server-side"
    requesting for instructions ( enemy details )
    2- the server responds with few variabls
        1- enemy_1 -> left/center/right
        2- enemy_2 -> left/center/right
        3- top_users
        4- me_details

        1- the first variable is random value from left to right
        2- the second variable is second enemy, in case if the user is in advanced level
        3- the third variable contains list of the top top players
        4- fourth variable contains details about the user himself, level and passed cars

    3- the "client-side" take the instructions, render it, 
    waits for 3 seconds and then send request to the "server-side"
    notifiying it that the car passed safely and requesting for the new instructions
