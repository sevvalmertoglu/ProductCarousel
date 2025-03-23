(() => {
    const loadJQuery = (callback) => {
        if (typeof jQuery === 'undefined') {
            const script = document.createElement("script");
            script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
            script.onload = callback;
            document.head.appendChild(script);
        } else {
            callback();
        }
    };

    const fetchProducts = async () => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            return JSON.parse(storedProducts);
        }
        try {
            const response = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json");
            const products = await response.json();
            localStorage.setItem("products", JSON.stringify(products));
            return products;
        } catch (error) {
            console.error("Ürünler alınırken hata oluştu:", error);
            return [];
        }
    };

    const getFavoriteProducts = () => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    };

    const toggleFavorite = (productId) => {
        let favorites = getFavoriteProducts();
        if (favorites.includes(productId)) {
            favorites = favorites.filter(id => id !== productId);
        } else {
            favorites.push(productId);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const init = async () => {
        if (window.location.pathname !== "/") {
            console.log("wrong page");
            return;
        }

        const products = await fetchProducts();
        buildHTML(products);
        buildCSS();
        setEvents();
    };

    const buildHTML = (products) => {
        const favorites = getFavoriteProducts();
        const container = $("<div class='carousel-container'>")
            .append("<h2 class='title'>Beğenebileceğinizi Düşündüklerimiz</h2>");

        const carouselWrapper = $("<div class='carousel-wrapper'>");
        const prevButton = $("<button class='slider-btn prev'></button>");
        const nextButton = $("<button class='slider-btn next'></button>");
        const carousel = $("<div class='carousel'>");

        products.forEach(product => {
            const isFavorite = favorites.includes(product.id);
            const favoriteIcon = isFavorite ? 
                "https://www.e-bebek.com/assets/svg/added-favorite.svg" :
                "https://www.e-bebek.com/assets/svg/default-favorite.svg";
            const discount = product.original_price > product.price ? `<span class='discount'>-${Math.round(((product.original_price - product.price) / product.original_price) * 100)}%</span>` : "";

            const randomStars = generateRandomStars();
            const reviewCount = Math.floor(Math.random() * 100) + 1;

            const productHTML = `
                <div class='product-card'>
                    <a href="${product.url}" target="_blank">
                        <img class="product-image" src="${product.img}" alt="${product.name}">
                        <h2 class="product-info">
                            <span class='brand'>${product.brand} - </span>
                            <span class='name'>${product.name}</span>
                        </h2>
                        <span class='stars'>${randomStars} <span class="review-count">(${reviewCount})</span></span>
                        <p class='price'>
                            <div class="price-top">
                                ${product.original_price > product.price ? `<span class='old-price'>${product.original_price} TL</span>` : ""}${discount}
                            </div>
                            <span class='current-price'>${product.price} TL</span>
                        </p>
                        <p class='campaign'>Farklı Ürünlerde 3 Al 2 Öde</p>
                    </a>
                    <img class="heart-icon" data-id='${product.id}' src="${favoriteIcon}" alt="Favorite">
                    <button class="add-to-cart">Sepete Ekle</button>
                </div>
            `;
            carousel.append(productHTML);
        });

        carouselWrapper.append(prevButton, carousel, nextButton);
        container.append(carouselWrapper);

        const bannerElement = $("eb-banner-with-product-carousel");
        if (bannerElement.length > 0) {
            bannerElement.after(container);
        } else {
            console.error("Hedef bileşen bulunamadı.");
        }
    };

    const buildCSS = () => {
        const css = `
            .carousel-container {
                width: 100%;
                max-width: 1320px; 
                border-radius: 10px;
                padding: 0;
                margin: 15px;
                background-color: #fff;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 1580px) {
                .carousel-container {
                    max-width: 1320px;
                }
            }

            @media (max-width: 1480px) {
                .carousel-container {
                    max-width: 1296px;
                }
            }

            @media (max-width: 1280px) {
                .carousel-container {
                    max-width: 1180px;
                }
            }

            @media (max-width: 992px) {
                .carousel-container {
                    max-width: 960px;
                }
            }

            @media (max-width: 768px) {
                .carousel-container {
                    max-width: 720px;
                }
            }

            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #fef6eb;
                font-family: Quicksand-Bold;
                padding: 25px 67px;
                text-align: center;
                border-top-left-radius: 35px;
                border-top-right-radius: 35px;
                font-size: 3rem;
                font-weight: 700;
                line-height: 1.11;
                color: #f28e00;
            }

            .carousel-wrapper {
                display: flex;
                min-height: 600px;
                align-items: center;
                justify-content: center;
                position: relative;
                width: 100%;
            }

            .carousel {
                display: flex;
                overflow: auto;
                align-items: stretch;
                width: 100%;
                height: 100%;
                scroll-behavior: smooth;
                white-space: nowrap;
            }

            .product-card {
                z-index: 1;
                display: flex;
                flex-direction: column;
                width: 270px;
                min-height: 570px;
                font-family: Poppins, "cursive";
                font-size: 12px;
                padding: 5px;
                color: #7d7d7d;
                margin-top: 20px;
                margin-right: 20px;
                border: 1px solid #ededed;
                border-radius: 10px;
                position: relative;
                text-decoration: none;
                background-color: #fff;
                justify-content: space-between;
                flex-shrink: 0;
            }

            .product-card:hover {
                color: #7d7d7d;
                cursor: pointer;
                z-index: 2;
                box-shadow: -10px 10px 100px 0 #00000030, inset 0 0 0 3px #f28e00;
            }   

            .product-card .product-image {
                max-width: 100% !important;
                max-height: 100%;
                width: auto;
                height: 203px;
                object-fit: contain;
                border-radius: 8px;
            }

            .product-info {
                display: flex;
                flex-direction: column;
                margin: 20px;
                flex-wrap: wrap;
            }

           .product-info .brand {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 10px;
                margin-right: 10px;
                color: #7d7d7d;
                display: inline-block;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }   

            .product-info .name {
                font-size: 12px;
                color: #7d7d7d;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                display: inline-block;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }  
                
            .stars {
                font-size: 14px;
                color: #d7d7d7;
                font-family: "Font Awesome 5 Free";
                font-weight: 900;
                gap: 5px;
                margin: 20px auto 20px 15px;
            }

            .stars i {
                margin-right: 5px;
            }   

            .stars:before {
                content: "\f005 \f005 \f005 \f005 \f005";
            }

            .stars.random {
                color: #d7d7d7;
            }

            .stars .filled {
                color: #fed100;
            }  
            
            .stars .review-count {
                color: #7d7d7d;
                font-family: Poppins, "cursive";
                font-weight: 400;
                font-size: 12px;
            }

            .price {
                margin: 15px;
                font-weight: 600;
                color: #7d7d7d;
                font-size: 24px;
            }

            .price-top {
                margin: 15px;
            }

            .current-price {
                margin: 15px;
                display: block;
                font-weight: 600;
                color: #7d7d7d;
                font-size: 24px;
            }

            .discount {
                color: #4bb788;
                width: fit-content;
                padding: 5.5px 9px 4.5px;
                font-weight: 900;
                font-size: 20px;
            }

            .old-price {
                text-decoration: line-through;
                color: #7d7d7d;
                font-size: 15px;
            }

            .heart-icon {
                position: absolute;
                top: 10px;
                right: 15px;
                cursor: pointer;
                background-color: #fff;
                border-radius: 50%;
                box-shadow: 0 2px 4px 0 #00000024;
                width: 50px;
                height: 50px;
                object-fit: contain;
                padding: 5px;   
            }

            .heart-icon:hover {
                content: url("https://www.e-bebek.com/assets/svg/default-hover-favorite.svg");
            }

            .heart-icon.filled {
                content: url("https://www.e-bebek.com/assets/svg/added-favorite.svg");
            }

            .campaign {
                margin: 15px;
                background: #eaf8f3;
                color: #4bb788;
                border-radius: 15px;
                width: fit-content;
                padding: 5.5px 9px 4.5px;
                font-weight: 600;
                font-size: 1.08rem;
                margin-top: 5px;
            }

            .add-to-cart {  
                font-size: 13px;
                line-height: 1.34;
                font-weight: bold;
                padding: 11px 12px;
                height: 48px;
                max-height: 48px;
                min-width: 48px;
                border-radius: 20px;
                background-color: #fef6eb;
                width: 90%;
                color: #f28e00;
                border: none;
                cursor: pointer;
                display: block;
                margin-bottom: 25px;
                margin-left: 15px;
                text-align: center;
            }

            .add-to-cart:hover {
                background-color: #f28e00;
                color: #fff;
            }

            .slider-btn.next, .slider-btn.prev{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                position: absolute;
                bottom: 50%;
                top: auto;
                background-color: #fef6eb;
                background-position: center;
                background-repeat: no-repeat;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }

            .slider-btn.next {
                background-image: url('https://cdn06.e-bebek.com/assets/svg/next.svg');
                right: -65px;
            }

            .slider-btn.prev {
                background-image: url('https://cdn06.e-bebek.com/assets/svg/prev.svg');
                left: -65px;
            }

            .slider-btn.next:hover, .slider-btn.prev:hover {
                background-color: #fff;
                border: 1px solid #f28e00;
            }

        `;
        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const generateRandomStars = () => {
        const totalStars = 5;
        let starsHTML = '';
        let filledStars = Math.floor(Math.random() * totalStars) + 1; 
    
        for (let i = 0; i < totalStars; i++) {
            if (i < filledStars) {
                starsHTML += `<i class="fa fa-star filled"></i>`;
            } else {
                starsHTML += `<i class="fa fa-star"></i>`; 
            }
        }
    
        return starsHTML;
    };    
    
    const setEvents = () => {
        let scrollAmount = 0;
        const productWidth = $(".product-card").outerWidth(true);
        const carousel = $(".carousel");

        $(".next").click(() => {
            if (scrollAmount + productWidth < carousel[0].scrollWidth - carousel.width()) {
                scrollAmount += productWidth;
                carousel.animate({ scrollLeft: scrollAmount }, 400);
            }
        });

        $(".prev").click(() => {
            if (scrollAmount > 0) {
                scrollAmount -= productWidth;
                carousel.animate({ scrollLeft: scrollAmount }, 400);
            }
        });

        $(document).on("click", ".heart-icon", function() {
            const productId = $(this).data("id");
            toggleFavorite(productId);
            const favorites = getFavoriteProducts();
            $(this).attr("src", favorites.includes(productId) ? 
                "https://www.e-bebek.com/assets/svg/added-favorite.svg" :
                "https://www.e-bebek.com/assets/svg/default-favorite.svg");
        });
    };

    loadJQuery(() => {
        init();
    });
})();