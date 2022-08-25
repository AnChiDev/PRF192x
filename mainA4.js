$(document).ready(function() {
    var api = 'aef0f57113007fd1c474fdd9628b204c';
    var api1 = '87da215b042b46f89eba2fbe4760c813';
    var api2 = 'affa2f2c9868da5de07f7cc91e47ed39';
    var api3 = '434195d4881ae28b76cbc10e3e5abaf8';
    loadnews();
    loadCovid();
    $('#tinhot').click(function() {
        loadTopic('breaking-news');
    });
    $('#kinhte').click(function() {
        loadTopic('business');
    });
    $('#khoahoc').click(function() {
        loadTopic('sience');
    });
    $('#thegioi').click(function() {
        loadTopic('world');
    });
    $('#giaitri').click(function() {
        loadTopic('entertainment');
    });
    $('#suckhoe').click(function() {
        loadTopic('health');
    });

    //show hide loading 
    function loadnews() {
        $('.loading').show();
        fetch('https://gnews.io/api/v4/top-headlines?&token=' + api1 + '&lang=en')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appendNews(data);
            })
            .then(function() {
                $('.loading').hide();
            });
    }


    function loadTopic(topic) {
        $(".loading").show();
        fetch('https://gnews.io/api/v4/top-headlines?topic=' + topic + '&token=' + api1 + '&lang=en')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appendNews(data);
            })
            .then(function() {
                $(".loading").hide();
            });
    }

    function appendNews(data) {
        $(".news-0 img").attr("src", data.articles[0].image);
        $(".news-0 a.tieude").attr("href", data.articles[0].url);
        $(".news-0 a.read-more").attr("href", data.articles[0].url);
        $(".news-0 a.tieude h5").text(data.articles[0].title);
        $(".news-0 p.noidung").text(data.articles[0].description);
        $(".news-0 .author").text(data.articles[0].source.name);
        $(".news").html(''); //Empty the Top News section
        for (let i = 1; i < 9; i++) {
            $(".news").append('<article class = "news-' + i + ' card col-3 d-inline-block"><div class = "col-12"><img src = "' + data.articles[i].image + '" class = "img-fluid"></div><div class = "col-12 text"><a href = "' + data.articles[i].url + ' " class = "headline" target="_blank"><h5>' + data.articles[i].title + '</h5></a><p class = "tacgia">Đăng bởi <span class = "author">' + data.articles[i].source.name + '</span></p><p class = "noidung">' + data.articles[i].description + '</p><div class = "link"><a href = "' + data.articles[i].url + '" class = "read-more" target="_blank">Đọc tiếp</a></div></div></article>');
        }
    }

    function loadCovid() {
        $('.loadingcv').show();
        fetch('https://gnews.io/api/v4/top-headlines?&token=' + api2 + '&lang=en')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appendCovid(data);
            })
            .then(function() {
                $('.loadingcv').hide();
            });
    }

    function appendCovid(data) {
        $('.covid').html('');
        for (let i = 1; i < 9; i++) {
            $('.covid').append('<article class = "covid-' + i + ' card col-3 d-inline-block"><div class = "col-12"><img src = "' + data.articles[i].image + '" class = "img-fluid"></div><div class = "col-12 text"><a href = "' + data.articles[i].url + ' " class = "headline" target="_blank"><h5>' + data.articles[i].title + '</h5></a><p class = "tacgia">Đăng bởi <span class = "author">' + data.articles[i].source.name + '</span></p><p class = "noidung">' + data.articles[i].description + '</p><div class = "link"><a href = "' + data.articles[i].url + '" class = "read-more" target="_blank">Đọc tiếp</a></div></div></article>');
        }
    }

    //tìm kiếm
    $('.search-button').click(function() {
        var keyword = prompt('Nhập thông tin cần tìm');

        if (keyword != '') {
            request = 'https://gnews.io/api/v4/search?q=' + keyword + '&token=' + api3 + '&lang=en';
            $(".loading").show();
            fetch(request)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    appendNews(data);
                })
                .then(function() {
                    $(".loading").hide();
                });
        }
    });

});