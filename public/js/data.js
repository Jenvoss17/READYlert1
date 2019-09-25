(function ($) {
    $(document).ready(function () {

        // TODO: make "logged in" route or dashboard that would set the user ID so we could pass user data in at route level rather than grabbing it here to prevent 
        // flash of unstyled content (FOUC)
        $.ajax({
            type: 'GET', url: '/api/v1/profiles/' + userID,
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            },
            success: function (response) {
                $('#user_name').html(response.name);
                $('#user_image').css("background-image", "url(" + response.picture + ")");
            }
        })


        // rosters
        $.ajax({
            type: 'GET', url: '/api/v1/rosters/creator/' + userID,
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            },
            success: function (response) {
                response.forEach(function (roster, index) {
                    $('#user_rosters').append(
                        '<div class="col-md-3 animate-box user-roster" data-animate-effect="fadeInLeft" data-toggle="modal" data-target="#modalRosterEdit" onclick="setRoster(this)" data-rid="' + roster.id + '">' +
                        '   <div class="services color-' + ((index % 4) + 1) + '">' +
                        '       <span class="icon2"><i class="icon-clipboard"></i></span>' +
                        '       <h3>' + roster.title + '</h3>' +
                        '   </div>' +
                        '</div>'
                    );
                    checkIfInView('.animate-box.user-roster');
                    $('#roster_count').html(response.length);
                })
            },
            complete: function () {
                if ($('#roster_count').is(':empty')) $('#roster_count').html(0);
            }
        })

        // profiles
        $.ajax({
            type: 'GET', url: '/api/v1/profiles/',
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            },
            success: function (response) {
                response.forEach(function (profile, index) {
                    $('#user_profiles').append(
                        '<div class="col-md-4 text-center animate-box user-profile" data-animate-effect="fadeInLeft" data-toggle="modal" data-target="#modalProfileEdit" onclick="setProfile(this)" data-pid="' + profile.id + '">' +
                        '    <div class="services color-' + ((index % 6) + 1) + '">' +
                        '        <span class="icon">' +
                        '            <i class="icon-bulb"></i>' +
                        '        </span>' +
                        '        <div class="desc">' +
                        '            <h3>' + profile.name + '</h3>' +
                        '            <p>' + profile.description + '</p>' +
                        '            <p>' + profile.address + '<br />' + profile.phone + '</p>' +
                        '        </div>' +
                        '    </div>' +
                        '</div>'
                    );
                    checkIfInView('.animate-box.user-profile');
                })
            }
        })

    }) // end $(document).ready

    // listen to scroll for dynamic content
    $(window).on('scroll', function () {
        checkIfInView('.animate-box.user-roster, .animate-box.user-profile');
    });


    function checkIfInView(selector) {
        $(selector).each(function () {
            if (isScrolledIntoView($(this))) {
                var animateClass = $(this).attr('data-animate-effect');
                $(this).addClass(animateClass + " animated");
            }
        })
    }

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
})(jQuery);