$(document).ready(function(){

    $('#LoginButton').on('click', function(){
        const email = $("#Login-Email").val();
        const password = $("#Login-Password").val();
        var data = {};
        data.email = email;	
        data.password = password;			  
        $.ajax({
            url: 'authenticate', 
            type: 'POST',
            data: JSON.stringify(data),
            cache: false,
            contentType: 'application/json',
                                    
            success: function(data) {
                if (data === 'Invalid username or password'){
                    alert(data);
                }
                else{
                    location.reload();
                }
            },
        });
    })
    
    $('#RegisterButton').on('click', function(){
        const name = $("#Register-name").val();
        const email = $("#Register-email").val();
        const password = $("#Register-password").val();
        var data = {};
        data.name = name;
        data.email = email;	
        data.password = password;			  
        $.ajax({
            url: 'userRegistration', 
            type: 'POST',
            data: JSON.stringify(data),
            cache: false,
            contentType: 'application/json',
                                    
            success: function(data) {
                if (data === 'Already registered user'){
                    alert(data);
                }
                else{
                    location.reload();
                }
            },
        });
    })
    
    $('.index-filtering').on('click', function(e){
    
        let filter = $(this).text();
        console.log(filter);
        const page = 1;
        var data = {};
        data.filter = filter;	
        data.search_for = '';			  
        data.page = page;
        $.ajax({
            url: 'games/', 
            type: 'POST',
            data: JSON.stringify(data),
            cache: false,
            contentType: 'application/json',
                                    
            success: function(html) {
                $('#gameContainer').html(html) ;
            }
        });
    });
    
    $('#filter-search').on('click', function(e){
    
        const filter = $("#filter").val();
        const search_for_game = $("#search_for_game").val();
        const page = 1;
        var data = {};
        data.filter = filter;				  
        data.search_for = search_for_game; 
        data.page = page;
        $.ajax({
            url: 'games/', 
            type: 'POST',
            data: JSON.stringify(data),
            cache: false,
            contentType: 'application/json',
                                    
            success: function(html) {
                $('#gameContainer').html(html) ;
            }
        });
    });
    
    $('#button-bookings').on('click', function(e){
        console.log("Kello");
        $.ajax({
            url: 'bookings/', 
            type: 'GET',
            cache: false,
            contentType: 'application/json',
                                    
            success: function(html) {
                // console.log("Success");
                console.log(html);
                $("#gameContainer").html(html);
            }
        });
        
    })
    
    $('#wishlist-button').on('click', function(e){
        $.ajax({
            url: 'wishlistItems/', 
            type: 'GET',
            cache: false,
            contentType: 'application/json',
                                    
            success: function(html) {
                // console.log("Success");
                // console.log(html);
                $("#gameContainer").html(html);
            }
        });
        
    })
    
    })