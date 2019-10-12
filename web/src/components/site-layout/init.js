

    $(document).ready( ()=>{
        
        $(".button-collapse").sideNav();
        $('.materialboxed').materialbox();
        $('.modal').modal();
        $('select').material_select();

        updateChips();

        startDiscovery();
    })

    var manager = {};
    manager.style = {};
    manager.accent = '#FFD73A';

    function toggleAccountIcon() {
        
        var elem = $('.account-icon a i.material-icons');

        if(elem.hasClass('opened')){
            elem.removeClass('opened');
            elem.text('keyboard_arrow_down');
        }else{
            elem.addClass('opened');
            elem.text('keyboard_arrow_up');  
        }


    }

    // Attaching click event handlers to all radio buttons...
    $('input[type="radio"]').bind('change', function(){

        // it worked till i broke it and i don't wanna fix it so screw you fancy effect.

       //$(this).parent().addClass('m-accent');
        //$(this).parent().removeClass('m-dark');
        
        //$('label[for="' + this.id + '"]').removeClass('m-accent-text');
        //$('label[for="' + this.id + '"]').addClass('m-dark-text');

        // Processing only those that match the name attribute of the currently clicked button...
        //$('input[name="' + $(this).attr('name') + '"]').not($(this)).trigger('deselect'); // Every member of the current radio group except the clicked one...

    });


    $( ".clickable" ).click(function() {
        
        var radButton = $(this).find('input[type=radio]');
        $(radButton).prop("checked", true);

        $(radButton).trigger('change');
        
    });    

    $('input[type="radio"]').bind('deselect', function(){

        $(this).parent().removeClass('m-accent');
        $(this).parent().addClass('m-dark');
        
        $('label[for="' + this.id + '"]').addClass('m-accent-text');
        $('label[for="' + this.id + '"]').removeClass('m-dark-text');
    })

    //Load userBar
    $('#userBarContent').load("/i/userBar", function(){
        $('.tooltipped').tooltip({delay: 50});
    });


    $('#commandsGeneric').show();


    // Write console warning.
    console.log("%cREAD THIS!", "background: red; color: yellow; font-size: x-large");
    console.warn("DO NOT paste anything in here, If you are having issues and need help. Join our support server!");


    if(editor){

        guild.langs.sort(function(a, b){
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        })
        
        guild.channels.text.sort(function(a, b){
            if(a.pos < b.pos) return -1;
            if(a.pos > b.pos) return 1;
            return 0;
        })
        guild.channels.voice.sort(function(a, b){
            if(a.pos < b.pos) return -1;
            if(a.pos > b.pos) return 1;
            return 0;
        })
        guild.channels.category.sort(function(a, b){
            if(a.pos < b.pos) return -1;
            if(a.pos > b.pos) return 1;
            return 0;
        })


                    //Populate selects text
                    $.each(guild.channels.text,function(key, value) 
                    {
                        $('.text-channel-select').append('<option value=' + value.id + '> ' + value.name + '</option>');
                    });   

                    //Populate selects voice
                    $.each(guild.channels.voice,function(key, value) 
                    {
                        $('.voice-channel-select').append('<option value=' + value.id + '> ' + value.name + '</option>');
                    });  

                    //Populate selects category
                    $.each(guild.channels.category,function(key, value) 
                    {
                        $('.category-channel-select').append('<option value=' + value.id + '> ' + value.name + '</option>');
                    });

                    //Populate selects role
                    $.each(guild.roles,function(key, value) 
                    {
                        if(value.name == "@everyone"){ return; }
                        $('.role-select').append('<option value="' + value.id + '" data-icon="/api/color/' + value.color + '" > <img src="' + 'http://www.thecolorapi.com/id?format=svg&named=false&hex=' + value.color + '"/>' + value.name + '</option>');
                    });

                    //Populate selects language
                    $.each(guild.langs,function(key, value) 
                    {
                        $('.lang-select').append('<option value=' + value.id + '> ' + value.name + '</option>');
                    });

        // Save dialog
        $( "form :input" ).change(function() {
            TriggerUnsaved();
        });

        $('#UnsavedChanges').hide();
        var doNotClosePage = false;

        function TriggerUnsaved(){
            $("#UnsavedChanges").slideDown("fast");
            doNotClosePage = true;
        }

        function SuspendUnsaved(){
            $("#UnsavedChanges").slideUp("fast");
            doNotClosePage = false;
        }

    }

    $("input[type='checkbox']").on('change', function() {
        if ($(this).is(':checked')) {
          $(this).attr('value', 'true');
        } else {
          $(this).attr('value', 'false');
        }
        
        $('#checkbox-value').text($('#checkbox1').val());
      });

function getBool( checkID ){

    var element = $("#"+checkID);
    return element.is(":checked") ? true : false;
}
function getRadio( group ) {

    var radios = document.getElementsByName( group );

    for (var i = 0, length = radios.length; i < length; i++)
    {
     if (radios[i].checked)
     {
      // do whatever you want with the checked radio
      return radios[i].value;
    
      // only one radio can be logically checked, don't check the rest
      break;
     }
    }

}


function startDiscovery(){

    var elems = [];
    $('.GetMember').each(function( index ) {

        elems.push(this);
        $(this).removeClass('getMember')

    });

    if(elems.length > 0){

        setTimeout( ()=>{ //Create some breathing room.

            setInterval( ()=> { //Prevent flooding the API

                var ids = [];

                if(elems.length >= 5){

                    ids = [ $(elems[0]).data( "member-id" ), $(elems[1]).data( "member-id" ), $(elems[2]).data( "member-id" ), $(elems[3]).data( "member-id" ), $(elems[4]).data( "member-id" ) ]
                    elems.splice(0, 5);

                }else{

                    for( var i = 0 ; i < elems.length ; i++ ){
                        ids.push($(elems[i]).data( "member-id" ));
                    }

                    elems = [];

                }

                if(ids.length > 0){

                    $.ajax({
                        url: "/api/guild/"+ guild.id +"/fetchMembers/" + ids.join(';'),
                        success: function(body){

                            body.forEach( item => {
                                $("[data-member-id="+item.id+"]").text(item.name);
                            })

                        }
                    });

                }


            }, 500)

        },100)

    }

}