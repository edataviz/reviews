var $, moment, v_commit_sha;
typeof window != "undefined" &&
  (window.Appio = {
    enableLogs: false,
    useRatingsCache: false,
    queryCache: {},
    autoWidgets: true, //auto generate widget and bage for old-style and trial themes, default true
    queryCacheType: "none", //none, db, redis, local, app
    host: "https://review-app.appio.pro",
    mediaHost: "https://media.appio.pro",
    validImageTypes: [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/apng",
      "image/svg",
      "image/webp",
    ],
    validVideoTypes: [
      //"video/mpeg",
      //"video/avi",
      //"video/wmv",
      "video/quicktime",
      "video/ogg",
      "video/webm",
      "video/mp4",
    ],
    ratingIcons: {
      5: "😊",
      4: "🙂",
      3: "😐",
      2: "🙁",
      1: "😞",
    },
    uploadFiles: [],
    maxZIndex: 2147483647,
    WIDGET_MARJOR_COLOR: "#b72a76",
    countries: [
      "ac",
      "ad",
      "ae",
      "af",
      "ag",
      "ai",
      "al",
      "am",
      "ao",
      "aq",
      "ar",
      "as",
      "at",
      "au",
      "aw",
      "ax",
      "az",
      "ba",
      "bb",
      "bd",
      "be",
      "bf",
      "bg",
      "bh",
      "bi",
      "bj",
      "bl",
      "bm",
      "bn",
      "bo",
      "bq",
      "br",
      "bs",
      "bt",
      "bv",
      "bw",
      "by",
      "bz",
      "ca",
      "cc",
      "cd",
      "cefta",
      "cf",
      "cg",
      "ch",
      "ci",
      "ck",
      "cl",
      "cm",
      "cn",
      "co",
      "cp",
      "cr",
      "cu",
      "cv",
      "cw",
      "cx",
      "cy",
      "cz",
      "de",
      "dg",
      "dj",
      "dk",
      "dm",
      "do",
      "dz",
      "ea",
      "ec",
      "ee",
      "eg",
      "eh",
      "er",
      "es-ct",
      "es-ga",
      "es-pv",
      "es",
      "et",
      "eu",
      "fi",
      "fj",
      "fk",
      "fm",
      "fo",
      "fr",
      "ga",
      "gb-eng",
      "gb-nir",
      "gb-sct",
      "gb-wls",
      "gb",
      "gd",
      "ge",
      "gf",
      "gg",
      "gh",
      "gi",
      "gl",
      "gm",
      "gn",
      "gp",
      "gq",
      "gr",
      "gs",
      "gt",
      "gu",
      "gw",
      "gy",
      "hk",
      "hm",
      "hn",
      "hr",
      "ht",
      "hu",
      "ic",
      "id",
      "ie",
      "il",
      "im",
      "in",
      "io",
      "iq",
      "ir",
      "is",
      "it",
      "je",
      "jm",
      "jo",
      "jp",
      "ke",
      "kg",
      "kh",
      "ki",
      "km",
      "kn",
      "kp",
      "kr",
      "kw",
      "ky",
      "kz",
      "la",
      "lb",
      "lc",
      "li",
      "lk",
      "lr",
      "ls",
      "lt",
      "lu",
      "lv",
      "ly",
      "ma",
      "mc",
      "md",
      "me",
      "mf",
      "mg",
      "mh",
      "mk",
      "ml",
      "mm",
      "mn",
      "mo",
      "mp",
      "mq",
      "mr",
      "ms",
      "mt",
      "mu",
      "mv",
      "mw",
      "mx",
      "my",
      "mz",
      "na",
      "nc",
      "ne",
      "nf",
      "ng",
      "ni",
      "nl",
      "no",
      "np",
      "nr",
      "nu",
      "nz",
      "om",
      "pa",
      "pe",
      "pf",
      "pg",
      "ph",
      "pk",
      "pl",
      "pm",
      "pn",
      "pr",
      "ps",
      "pt",
      "pw",
      "py",
      "qa",
      "re",
      "ro",
      "rs",
      "ru",
      "rw",
      "sa",
      "sb",
      "sc",
      "sd",
      "se",
      "sg",
      "sh",
      "si",
      "sj",
      "sk",
      "sl",
      "sm",
      "sn",
      "so",
      "sr",
      "ss",
      "st",
      "sv",
      "sx",
      "sy",
      "sz",
      "ta",
      "tc",
      "td",
      "tf",
      "tg",
      "th",
      "tj",
      "tk",
      "tl",
      "tm",
      "tn",
      "to",
      "tr",
      "tt",
      "tv",
      "tw",
      "tz",
      "ua",
      "ug",
      "um",
      "un",
      "us",
      "uy",
      "uz",
      "va",
      "vc",
      "ve",
      "vg",
      "vi",
      "vn",
      "vu",
      "wf",
      "ws",
      "xk",
      "xx",
      "ye",
      "yt",
      "za",
      "zm",
      "zw",
    ],
    CARD_SPACING: 20,
    CARD_MIN_WIDTH: 250,
    CARD_MAX_WIDTH: 400,

    mediaError: (media) => {
      media.onerror = null;
      media.setAttribute("src_not_found", media.src);
      media.src = "";
      return true;
    },

    showWriteReviewForm: (force) => {
      if (!force && !Appio.config.showReviewButton) return;
      !$(".appio-review-cover").length && Appio.buildReviewForm();
      Appio.showBackdropBox(".appio-review-cover");
      !$('input[name="appio-review-input-rating"]:checked').val() &&
        Appio.starsAnimation();
    },

    hideWriteReviewForm: () => {
      Appio.hideBackdropBox(".appio-review-cover");
      $(".appio-review-form").css({ "pointer-events": "", opacity: "" });
      $(".appio-error-input").removeClass("appio-error-input");
      $(".appio-validation-message").remove();
      $(".appio-button-submit-review").html(Appio.config.textSubmitReview);
      Appio.resetReviewRating(); //to reset rating caption
    },

    resetReviewRating: () => {
      try {
        $("#appio-star5").change();
      } catch {}
    },

    filterReviews: ({ filter, review, rating }) => {
      let filter2 = review;
      !filter && rating && (filter = rating);
      let toggle = false;
      if (filter < 0) {
        filter = -filter;
        toggle = true;
      }
      if (Appio.data.filter == filter && Appio.data.filter2 == filter2) {
        if (toggle) filter = "all";
        else return;
      }
      if (Appio.data.filter != filter || Appio.data.filter2 != filter2) {
        $(
          `.appio-filter-item[filter="${toggle ? "-" : ""}${
            Appio.data.filter
          }"]`
        ).removeAttr("active");
        $(`.appio-filter-item[filter="${toggle ? "-" : ""}${filter}"]`).attr(
          "active",
          ""
        );
        $(
          `.appio-rating-line-star[filter="${toggle ? "-" : ""}${
            Appio.data.filter
          }"]`
        ).removeAttr("active");
        $(
          `.appio-rating-line-star[filter="${toggle ? "-" : ""}${filter}"]`
        ).attr("active", "");
        filter && (Appio.data.filter = filter);
        filter2 && (Appio.data.filter2 = filter2);
        Appio.loadProductReviews({
          page: 1,
          requireCount: true,
          featured: Appio.isAllReviewsPage,
        });
      }
    },

    sortReviews: async (sort) => {
      if (Appio.data.sort == sort) return;
      Appio.data.sort = sort;
      Appio.loadProductReviews({ page: 1, featured: Appio.isAllReviewsPage });
    },

    buildGrid: (allrvs) => {
      if (Appio.config.widgetLayout != "grid" || Appio.preventCardsArrange)
        return;
      if (Appio[`_timerBuildGrid${allrvs}`]) {
        clearTimeout(Appio[`_timerBuildGrid${allrvs}`]);
        delete Appio[`_timerBuildGrid${allrvs}`];
      }
      Appio[`_timerBuildGrid${allrvs}`] = setTimeout(
        async () => {
          Appio.isMobile && (Appio.CARD_SPACING = 10);
          const boxClass = allrvs ? ".appio-allrvs-box" : ".appio-reviews-box";
          const W = $(boxClass).width(),
            maxCols = 8,
            minCols = 1;
          if (!W) return;

          let cols = minCols;
          if (W / maxCols > Appio.CARD_MAX_WIDTH) cols = maxCols;
          //else if (W / minCols < Appio.CARD_MIN_WIDTH) cols = minCols;
          else
            for (var i = maxCols; i >= minCols; i--) {
              const c = W / i;
              if (c >= Appio.CARD_MIN_WIDTH) {
                // && c <= Appio.CARD_MAX_WIDTH){
                cols = i;
                break;
              }
            }
          const baseWidth = (W - (cols - 1) * Appio.CARD_SPACING) / cols;
          $(boxClass + " .appio-review-item-holder").css({
            width: baseWidth + "px",
          });

          //wait for all preview images loaded
          const makeGrid = () => {
            const colsHeight = Array.apply(null, Array(cols)).map(function () {
              return 0;
            });
            const getLowestCol = function () {
              let col = 0,
                min = colsHeight[col];
              colsHeight.forEach((h, i) => {
                h < min && ((col = i), (min = h));
              });
              return col;
            };
            $(boxClass + " .appio-review-item-holder").each(function () {
              const col = getLowestCol();
              $(this).css({
                top: colsHeight[col],
                left: col == 0 ? 0 : (baseWidth + Appio.CARD_SPACING) * col,
              });
              colsHeight[col] += $(this).height() + Appio.CARD_SPACING;
            });
            const height = Math.max(...colsHeight);
            (height > 0 || !allrvs) && $(boxClass).height(height);
          };
          makeGrid();
          const images = document.querySelectorAll(boxClass + " img");
          if (images?.length > 0) {
            await Promise.all(
              Array.from(images)
                .filter((img) => !img.complete)
                .map(
                  (img) =>
                    new Promise((resolve) => {
                      img.onload = img.onerror = resolve;
                    })
                )
            );
            //all images have loaded
            makeGrid();
          }
          const videos = document.querySelectorAll(boxClass + " video");
          if (videos?.length > 0) {
            await Promise.all(
              Array.from(videos).map(
                (video) =>
                  new Promise((resolve) => {
                    video.ondurationchange = video.onerror = resolve;
                  })
              )
            );
            //all videos have loaded
            makeGrid();
          }
        },
        Appio.isUIPreview ? 0 : 500
      );
    },

    doFetch: async ({
      url,
      headers,
      data,
      readStream = true,
      method = "POST",
      callback,
      cached,
    }) => {
      const fetchOptions = {
        method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "query-cache-type": Appio.queryCacheType,
        },
      };
      let cacheKey, response;
      data && (fetchOptions.body = JSON.stringify(data));
      if (cached) {
        cacheKey = url + (fetchOptions.body ?? "");
        response = Appio.queryCache[cacheKey];
        if (cached == "getkey") return cacheKey;
      }
      if (response == undefined) {
        response = await fetch(url, fetchOptions);
        if (readStream) {
          response = await response.json();
        }
        if (cached && cacheKey) {
          Appio.queryCache[cacheKey] = response;
        }
      } else {
        Appio.log(`Read data from cache of key: "${cacheKey}"`);
      }
      callback?.(response);
      return response;
    },

    stopAllVideo: () => {
      $("#appio-img-box video").each(function () {
        this.pause();
        this.currentTime = 0;
      });
    },

    showImage: (p) => {
      if (!Appio.swiperMedia) return;
      if (Appio.isUIPreview) return;
      const box = $(p).closest(
        ".appio-review-item-media-box, .appio-review-item-media-box-top, .appio-media-list"
      )[0];
      if (box && Appio.swiperMediaBox != box) {
        Appio.swiperMediaBox = box;
        Appio.swiperMedia.removeAllSlides();
        let i = -1;
        $(box)
          .find("img, video")
          .each(function (index, element) {
            const src = $(this).attr("src") ?? $(this).attr("data-src");
            const reviewId = $(this).attr("reviewId");
            if (src == p.getAttribute("src")) i = index;
            Appio.swiperMedia.appendSlide(
              `<div class="swiper-slide"><div class="swiper-zoom-container">${Appio.buildMediaTag(
                { src, reviewId }
              )}</div></div>`
            );
          });
      }
      const media = $(p).closest(".appio-review-media-item")[0];
      if (media) {
        const index = [...media.parentElement.children].indexOf(media);
        Appio.swiperMedia.slideTo(index, 0, false);
      }
      Appio.showBackdropBox("#appio-img-box");
      $(".appio-review-for-media").removeAttr("small");
      setTimeout(() => {
        $(".swiper-slide-active video")[0]?.play();
      }, 500);
    },

    translateApi: async (from, s) => {
      if (from == Appio.locale) return;
      let q = encodeURIComponent(s);
      if (q.length > 16312) q = q.substring(0, 16312);
      const res =
        q &&
        (await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&format=html&sl=${from}&tl=${Appio.locale}&dt=t&q=${q}`
        ));
      const ts = res && (await res.json());
      return ts?.[0];
    },

    applyTranslation: (ts, rmap, textObjs) => {
      let s = "",
        reviewId;
      ts?.map((tx) => {
        const t = tx[0] ?? tx;
        if (t.startsWith("%%")) {
          reviewId = Number(t.substring(2));
          if (reviewId > 0 && s) {
            $(
              `.appio-review-item[reviewid="${reviewId}"] .appio-review-item-title`
            ).html(Appio.correctReviewTitle(s));
            rmap[reviewId] && (rmap[reviewId].title = s);
          }
          s = "";
        } else if (t.startsWith("@@")) {
          reviewId = Number(t.substring(2));
          if (reviewId > 0 && s) {
            $(
              `.appio-review-item[reviewid="${reviewId}"] .appio-review-item-body`
            ).html(s);
            rmap[reviewId] && (rmap[reviewId].body = s);
          }
          s = "";
        } else if (t.startsWith("^^")) {
          const index = Number(t.substring(2));
          s &&
            index >= 0 &&
            Appio.translateKeys?.[index] &&
            (Appio.config[Appio.translateKeys[index]] = s);
          s = "";
        } else if (t.startsWith("~~")) {
          const index = Number(t.substring(2));
          s && index >= 0 && textObjs?.[index] && $(textObjs[index]).html(s);
          s = "";
        } else t && (s += (s ? " " : "") + t);
      });
    },

    translateEachReview: async (reviews) => {
      for (const r of reviews) {
        if (!r.translated) {
          r.translated = true;
          const q = `<x><y>${r.title}</y>%%${r.id}<z>${r.body}</z></x>@@${r.id}`;
          const ts = await Appio.translateApi("auto", q);
          Appio.applyTranslation(ts, { [r.id]: r });
        }
      }
    },

    translateA: async (reviews) => {
      let targetLanguageCode = Appio.locale,
        qText = [],
        qIndexes = [],
        textObjs;
      if (Appio.translateTexts) {
        if (!Appio.translateKeys) {
          Appio.translateKeys = [
            "textReadMore",
            "textPrevPage",
            "textNextPage",
            "textShowMore",
            "textVerified",
            "textShopReply",
            "textLikeReview",
            "textWidgetTitle",
            "textValidationContent",
            "textValidationName",
            "textValidationEmail",
            "textSendingReview",
            "textUploadMediaFailed",
            "textReviewSuccess",
            "textReviewFailed",
            "textValidationLimitFiles",
            "textValidationLimitVideo",
            "textRating",
            "textRating1",
            "textRating2",
            "textRating3",
            "textRating4",
            "textRating5",
            "textReviewButton",
            "textReviewRating",
            "textReviewTitle",
            "textReviewContent",
            "textReviewerName",
            "textReviewerEmail",
            "textAddMedia",
            "textSubmitReview",
            "textSidebar",
          ];
          Appio.translateKeys.map((key, index) => {
            qText.push(Appio.lang.English[key]);
            qIndexes.push(index);
          });
        }
        textObjs = $("*[appio-text]");
        textObjs.each((index, el) => {
          $(el).removeAttr("appio-text");
          qText.push($(el).text());
          qIndexes.push(el);
        });
      }
      reviews.map((r) => {
        if (!r.translated) {
          r.translated = true;
          if (r.title) {
            qText.push(r.title);
            qIndexes.push(["title", r]);
          }
          if (r.body) {
            qText.push(r.body);
            qIndexes.push(["body", r]);
          }
        }
      });
      const ts =
        qText.length &&
        (await Appio.doFetch({
          url: "https://translate-endpoint.nghia.workers.dev",
          data: {
            contents: qText,
            targetLanguageCode,
          },
        }));
      ts?.translations?.map(({ translatedText: s }, index) => {
        const o = qIndexes[index],
          t = typeof o;
        if (t == "number") {
          Appio.translateKeys?.[o] &&
            (Appio.config[Appio.translateKeys[o]] = s);
        } else if (t == "object") {
          if (Array.isArray(o) && o.length == 2) {
            const review = o[1];
            if (o[0] == "title") {
              $(
                `.appio-review-item[reviewid="${review.id}"] .appio-review-item-title`
              ).html(Appio.correctReviewTitle(s));
              review.title = screenLeft;
            } else if (o[0] == "body") {
              $(
                `.appio-review-item[reviewid="${review.id}"] .appio-review-item-body`
              ).html(s);
              review.body = s;
            }
          } else if (o.innerHTML) {
            o.innerHTML = s;
          }
        }
      });
    },

    translateG: async (reviews) => {
      let qText = "",
        textObjs;
      if (Appio.translateTexts) {
        if (!Appio.translateKeys) {
          Appio.translateKeys = [
            "textReadMore",
            "textPrevPage",
            "textNextPage",
            "textShowMore",
            "textVerified",
            "textShopReply",
            "textLikeReview",
            "textWidgetTitle",
            "textValidationContent",
            "textValidationName",
            "textValidationEmail",
            "textSendingReview",
            "textUploadMediaFailed",
            "textReviewSuccess",
            "textReviewFailed",
            "textValidationLimitFiles",
            "textValidationLimitVideo",
            "textRating",
            "textRating1",
            "textRating2",
            "textRating3",
            "textRating4",
            "textRating5",
            "textReviewButton",
            "textReviewRating",
            "textReviewTitle",
            "textReviewContent",
            "textReviewerName",
            "textReviewerEmail",
            "textAddMedia",
            "textSubmitReview",
            "textSidebar",
          ];
          Appio.translateKeys.map((key, index) => {
            qText += `<x>${Appio.lang.English[key]}</x>^^${index}`;
          });
        }
        textObjs = $("*[appio-text]");
        textObjs.each((index, el) => {
          qText += `<x>${$(el).html()}</x>~~${index}`;
          $(el).removeAttr("appio-text");
        });
      }
      const rmap = {};
      let ts = (!!qText && (await Appio.translateApi("en", qText))) || [];
      if (Appio.config.translateEachReview) Appio.translateEachReview(reviews);
      else {
        let qRvs = "";
        reviews.map(
          (r) =>
            !r.translated &&
            ((r.translated = true),
            (rmap[r.id] = r),
            (qRvs += `<x><y>${r.title}</y>%%${r.id}<z>${r.body}</z></x>@@${r.id}`))
        );
        ts = ts.concat(
          (!!qRvs && (await Appio.translateApi("auto", qRvs))) || []
        );
      }
      Appio.applyTranslation(ts, rmap, textObjs);
    },

    translate: async (reviews) => {
      if (
        !Appio.locale ||
        !Appio.config.autoTranslateReviews ||
        (!Appio.isVIPPlan &&
          !Appio.isPremiumPlan &&
          !Appio.config.allowedOptions?.includes("autoTranslateReviews"))
      )
        return;
      await Appio.translateG(reviews ?? Appio.reviews);
    },

    keepScrollOffset: (oldPos) => {
      const pos = document.documentElement.scrollHeight - window.scrollY;
      oldPos && window.scrollBy(0, pos - oldPos);
      return pos;
    },

    loadProductReviews: async ({
      page,
      pageSize,
      sort,
      filter,
      featured,
      requireCount,
      checkFirstPageReviews,
      keepScrollPosition,
      isShowMore,
      cacheFistPage,
    }) => {
      if (Appio.isUIPreview) return;
      page && (Appio.data.page = +page);
      let reviews, reviewsCount;
      if (Appio.isFeaturedWidget) {
        reviews =
          Appio.featuredReviews?.slice(
            (Appio.data.page - 1) * Appio.config.pageSize,
            Appio.data.page * Appio.config.pageSize
          ) ?? [];
      } else {
        (Appio.data.filter == "all" || Appio.data.filter == "any") &&
          delete Appio.data.filter;
        (Appio.data.filter2 == "all" || Appio.data.filter2 == "any") &&
          delete Appio.data.filter2;
        $(".appio-reviews-section").attr("loading", "");
        Appio.showLoading(".appio-reviews-section");
        const res = await Appio.fetchReviews(
          {
            ...Appio.data,
            featured,
            sort: sort ?? Appio.data.sort,
            filter: filter ?? Appio.data.filter,
            page: page ?? Appio.data.page,
            pageSize: pageSize ?? Appio.config.pageSize,
            pinnedFirst: Appio.config.pinnedFirst,
            requireCount,
            checkFirstPageReviews,
          },
          cacheFistPage ? "getkey" : true
        );
        Appio.hideLoading();
        if (cacheFistPage) {
          Appio.queryCache[res] = { reviews: Appio.reviews };
          return;
        } else {
          reviews = res.reviews;
          reviewsCount = res.reviewsCount;
        }
      }
      let rebuild = true;
      isShowMore
        ? reviews?.length
          ? (Appio.reviews = Appio.reviews.concat(reviews))
          : (rebuild = false)
        : (Appio.reviews = reviews);
      Appio.buildPagingSection(reviewsCount);
      rebuild && Appio.buildReviewsSection();

      //oldPos = Appio.keepScrollOffset(oldPos);
      if (Appio.config.widgetLayout == "grid") {
        await Appio.buildGrid();
        // Appio.keepScrollOffset(oldPos);
      }
      return reviewsCount;
    },

    showLoading: (selector) => {
      $(selector)
        .append(
          `<div class="appio-loading">
  <svg viewBox="0 0 50 50" style="width:80px;height:80px;fill:var(--appio-action-button-fill)">
    <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
      <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8" repeatCount="indefinite"></animateTransform>
    </path>
  </svg>
</div>`
        )
        .attr("loading", "");
    },

    hideLoading: (selector) => {
      (selector
        ? $(selector).removeAttr("loading").find(".appio-loading")
        : $(".appio-loading")
      ).remove();
    },

    checkWindowScrollbar: (force) => {
      if (Appio.isUIPreview) return;
      if (force || document.querySelector("body>.appio-backdrop[show]")) {
        if (!window.onscroll) {
          const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop,
            scrollLeft =
              window.pageXOffset || document.documentElement.scrollLeft;
          window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
          };
        }
      } else {
        window.onscroll = null;
      }
    },

    uiPreviewScrollTop: () => {
      const p = document.querySelector(
        Appio.isMobile ? "#appioPreviewWrapper" : "#appioPreviewBox"
      );
      p &&
        (p.scrollTo?.({
          top: 0,
          behavior: "smooth",
        }),
        setTimeout(() => (p.scrollTop = 0), 500));
    },

    showBackdropBox: (box) => {
      $(box).css("display", "flex");
      setTimeout(() => {
        $(box).attr("show", "");
        //Appio.checkWindowScrollbar(true);
      });
      Appio.isUIPreview && Appio.uiPreviewScrollTop();
    },

    hideBackdropBox: (box, callback) => {
      $(box).removeAttr("show");
      //Appio.checkWindowScrollbar();
      setTimeout(() => {
        $(box).css("display", "none");
        callback?.();
      }, 510);
    },

    fetchReviews: async (data, cached = true) => {
      return await Appio.doFetch({
        url: "/apps/appio/review/get-product-reviews-store",
        cached,
        data,
      });
    },

    loadAllReviews: async (more) => {
      Appio.allrvsPage = (Appio.allrvsPage || 1) + !!more;
      Appio.allrvsPageSize = 10;
      const MAX_ALL_REVIEWS = 100;
      Appio.showLoading(more ? ".button-allrvs-more" : ".appio-allrvs-section");
      const res = await Appio.fetchReviews({
        featured: true,
        sort: "featured",
        page: Appio.allrvsPage,
        pageSize: Appio.allrvsPageSize,
        pinnedFirst: Appio.config.pinnedFirst,
      });
      Appio.hideLoading(more ? ".button-allrvs-more" : ".appio-allrvs-section");
      if (res?.reviews?.length) {
        !Appio.allReviews && (Appio.allReviews = []);
        Appio.allReviews = Appio.allReviews.concat(res.reviews);
        Appio.buildReviewsSection(
          true,
          Appio.allReviews,
          res.reviews.length >= Appio.allrvsPageSize &&
            Appio.allReviews.length < MAX_ALL_REVIEWS
        );
      } else {
        $(".button-allrvs-more").remove();
      }
    },

    showAllReviews: async () => {
      let $allrvs = $(".appio-allrvs-cover");
      if (!$allrvs.length) {
        $allrvs =
          $(`<div class="appio-allrvs-cover appio-backdrop" style="z-index:${
            Appio.maxZIndex - 1
          }">
    <div class="appio-allrvs-container">
      <div class="appio-review-box-header"><div class="appio-review-box-title appio-widget-title" appio-text>${
        Appio.config.textSidebar
      }</div>
        <i class="appio-close-button"></i>
      </div>
      <div class="appio-allrvs-section${
        Appio.isMobile ? '" mobile' : ' appio-thin-scrollbar"'
      } nomore>
        <div class="appio-allrvs-box appio-body" ${Appio.config.widgetLayout}>
        </div>
        <button type="button" class="button-allrvs-more" onclick="Appio.loadAllReviews(true)" appio-text>${
          Appio.config.textShowMore
        }</button>
      </div>
    </div>
    </div>
    `);
        $(Appio.container).append($allrvs);
        $(".appio-allrvs-container .appio-close-button").click(() => {
          Appio.hideBackdropBox(".appio-allrvs-cover");
        });

        Appio.showBackdropBox(".appio-allrvs-cover");
        Appio.loadAllReviews();
      } else {
        Appio.showBackdropBox(".appio-allrvs-cover");
        Appio.buildGrid(true);
      }
    },

    navigateToPage: async (page) => {
      let thePage = Appio.data.page;
      if (page == "-" && Appio.data.page > 1) {
        thePage--;
      } else if (
        (page == "+" || page == "++") &&
        Appio.data.page < Appio.totalPages
      ) {
        thePage++;
      } else thePage = +page;
      if (Appio.data.page == thePage) return;
      Appio.data.page = thePage;
      Appio.isUIPreview
        ? Appio.buildPagingSection()
        : await Appio.loadProductReviews({
            keepScrollPosition: true,
            isShowMore: page == "++",
          });
    },

    buildStarRating: (rating) => {
      let html = "";
      if (rating == -1)
        html += `<span class="appio-star">${Appio.config.ratingIcon.charAt(
          0
        )}</span>`;
      else if (rating > Math.floor(rating)) {
        html += `<div class="appio-rating-layers" style="--appio-rating-value:${
          Math.ceil(rating * 2) / 2
        }">
        <div class="appio-stars">
          ${`<span class="appio-star">${`${Appio.config.ratingIcon[1]}`}</span>`.repeat(
            5
          )}</div>
        <div class="appio-stars">
          ${`<span class="appio-star">${`${Appio.config.ratingIcon[0]}`}</span>`.repeat(
            5
          )}</div>
      </div>`;
      } else {
        html += '<div class="appio-stars">';
        for (let i = 1; i <= 5; i++) {
          const ch = rating >= i ? 0 : rating >= i - 0.5 ? 0 : 1;
          html += `<span class="appio-star"${
            ch == 0 ? " solid" : ""
          }>${`${Appio.config.ratingIcon.charAt(ch)}`}</span>`;
        }
        html += "</div>";
      }
      return html;
    },

    buildPagingSection: (reviewsCount) => {
      if (
        !Appio.config.showBody ||
        !Appio.config.paginationType ||
        Appio.config.paginationType.includes("none") ||
        !$(".appio-paging-box").length
      )
        return;
      reviewsCount =
        (reviewsCount ??
          Appio.featuredReviews?.length ??
          Appio.reviewsTotal ??
          parseInt(Appio.productRating.realTotal)) ||
        0;
      reviewsCount > Appio.limitReviews && (reviewsCount = Appio.limitReviews);
      const totalPage = reviewsCount
        ? 1 + Math.floor((reviewsCount - 1) / Appio.config.pageSize)
        : 0;
      let html_nav = "";
      let pages = [];
      Appio.totalPages = totalPage;
      if (totalPage > 1) {
        const isFirstPage = Appio.data.page < 2,
          isLastPage = Appio.data.page >= totalPage,
          isTypeNumbers = Appio.config.paginationType.includes("numbers");
        if (isTypeNumbers) {
          Appio.data.page - 3 > 0 &&
            pages.push({ value: 1, label: "", type: "first" });
          Appio.data.page - 2 > 0 && pages.push({ value: Appio.data.page - 2 });
          Appio.data.page - 1 > 0 && pages.push({ value: Appio.data.page - 1 });
          pages.push({ value: Appio.data.page });
          Appio.data.page + 1 <= totalPage &&
            pages.push({ value: Appio.data.page + 1 });
          Appio.data.page + 2 <= totalPage &&
            pages.push({ value: Appio.data.page + 2 });
          Appio.data.page + 3 <= totalPage &&
            pages.push({ value: totalPage, label: "", type: "last" });
        } else if (Appio.config.paginationType.includes("pages")) {
          if (totalPage < 7) {
            pages = Array.apply(null, Array(totalPage)).map(function (_, i) {
              return { value: i + 1 };
            });
          } else {
            pages.push({ value: 1 });
            Appio.data.page - 1 >= 3 &&
              pages.push({ value: Appio.data.page - 1 == 3 ? 2 : "..." });
            Appio.data.page - 1 > 1 &&
              pages.push({ value: Appio.data.page - 1 });
            Appio.data.page > 1 &&
              Appio.data.page < totalPage &&
              pages.push({ value: Appio.data.page });
            Appio.data.page + 1 < totalPage &&
              pages.push({ value: Appio.data.page + 1 });
            Appio.data.page + 1 <= totalPage - 2 &&
              pages.push({
                value:
                  Appio.data.page + 1 == totalPage - 2 ? totalPage - 1 : "...",
              });
            totalPage > 1 && pages.push({ value: totalPage });
          }
        } else if (Appio.config.paginationType.includes("prev-next")) {
          pages.push(
            {
              disabled: isFirstPage,
              value: "-",
              label: Appio.config.textPrevPage,
            },
            {
              disabled: isLastPage,
              value: "+",
              label: Appio.config.textNextPage,
            }
          );
        } else if (Appio.config.paginationType.includes("more")) {
          !isLastPage &&
            pages.push({ value: "++", label: Appio.config.textShowMore });
        }
        pages.forEach((p) => {
          p.value == "..." || p.disabled
            ? (html_nav += `<button type="button" disabled page="${
                p.value
              }" class="appio-paging-button" appio-text>${
                p.label ?? p.value
              }</button>`)
            : (html_nav += `<button type="button" class="appio-paging-button"${
                p.value == Appio.data.page ? " active" : ""
              }${isTypeNumbers ? " numbers" : ""} ${p.type ?? ""} page="${
                p.value
              }" appio-text>${p.label ?? p.value}</button>`);
        });
      }
      $(".appio-paging-box").html(html_nav);
      $(".appio-paging-button:not([disabled]):not([active])").click(
        async function () {
          $(this).attr("loading", "");
          await Appio.navigateToPage($(this).attr("page"));
          $(this).removeAttr("loading");
          //!Appio.isUIPreview && Appio.widgetElement?.scrollIntoView({ behavior: "smooth" });
        }
      );
    },

    buildMediaTag: ({ src, isThumb, reviewId, autoPlay }) => {
      const srcLowcase = src.toLowerCase().trim();
      const common = `${
        isThumb ? ` onerror="window.AppioOnMediaError?.(this)"` : ""
      }${reviewId ? ` reviewId="${reviewId}"` : ""}`;
      const ext = srcLowcase
        .substring(1 + srcLowcase.lastIndexOf("."))
        .split("?")[0];
      const disableLazyload =
        Appio.config.disableLazyload ||
        Appio.isUIPreview ||
        Appio.config.widgetLayout == "roll" ||
        Appio.config.widgetLayout == "slide" ||
        Appio.config.widgetLayout == "line";
      !srcLowcase.startsWith("http://") &&
        !srcLowcase.startsWith("https://") &&
        !src.startsWith("/") &&
        (src = `${Appio.mediaHost}/${src}`);
      let item = "";
      if (["mov", "mp4", "m4v", "ogv", "ogm", "webm"].includes(ext))
        !Appio.isFreePlan &&
          !Appio.isEssentialPlan &&
          (item = isThumb
            ? `<div class="appio-review-media-item" video><video thumb preload="metadata" ${
                disableLazyload
                  ? `src=${src}`
                  : `data-src="${src}" class="lazy"`
              }${common}></video></div>`
            : `<video src="${src}" controls${
                autoPlay ? " autoplay" : ""
              }${common}></video>`);
      else
        item = `<img ${
          isThumb
            ? `thumb ${
                disableLazyload ? `src=${src}` : `data-src="${src}"`
              } class="appio-review-media-item ${
                disableLazyload ? "" : "lazy"
              }"`
            : `src="${src}"`
        }${common}>`;

      return item;
    },

    setCookie: (cname, cvalue, exdays = 10) => {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },

    getCookie: (cname) => {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    formatDate: (date) => {
      if (Appio.config.textReviewDateFormat && Appio.momentLoaded) {
        return moment(date).format(Appio.config.textReviewDateFormat);
      }
      typeof date === "string" && date.endsWith("Z") && (date = new Date(date));
      if (date instanceof Date) {
        return date.toLocaleString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
          //hour: '2-digit',
          //minute: '2-digit',
          //hourCycle: 'h24'
        });
      }
      return date;
    },

    getReviewLiked: function () {
      let reviewId, likes, action;
      typeof arguments[0] == "object"
        ? ({ reviewId, likes, action } = arguments[0])
        : (reviewId = arguments[0]);

      Appio.likedReviews == undefined &&
        (Appio.likedReviews = Appio.getCookie("AppioLikedReviews") ?? "");

      const reviewLike = {
        isLiked: undefined,
        count: 0,
        time: 0,
      };

      const likeToString = () =>
        reviewLike.isLiked == undefined
          ? ""
          : `${reviewId}#${reviewLike.isLiked ? "1" : "0"}:${
              reviewLike.count
            }:${reviewLike.time},`;

      const saveLike = () => {
        if (reviewLike.isLiked == undefined) return;
        if (reviewLike.position) {
          Appio.likedReviews =
            Appio.likedReviews.substring(0, reviewLike.position.begin) +
            likeToString() +
            Appio.likedReviews.substring(reviewLike.position.end + 1);
        } else Appio.likedReviews += likeToString();
        Appio.setCookie("AppioLikedReviews", Appio.likedReviews);
      };

      const search = `${reviewId}#`;
      let i = Appio.likedReviews?.indexOf(search);
      let found = i >= 0;
      if (found) {
        const k = search.length;
        let j = Appio.likedReviews?.indexOf(",", i + k);
        j < 0 && (j = Appio.likedReviews.length);
        const parts = Appio.likedReviews.substring(i + k, j).split(":");
        reviewLike.isLiked = parts[0]?.length > 0 ? parts[0] == 1 : undefined;
        reviewLike.count = Number(parts[1]) || 0;
        reviewLike.time = Number(parts[2]) || 0;
        reviewLike.position = { begin: i, end: j };
      }
      if (action) {
        reviewLike.isLiked = action == "like";
        reviewLike.count = likes;
        reviewLike.time = Math.floor(+new Date() / 1000);
        saveLike();
      }
      return reviewLike;
    },

    xssEscape: (s) => {
      return s?.length
        ? s
            .replace(/<S/g, "&lt;S")
            .replace(/<s/g, "&lt;s")
            .replace(/<\/S/g, "&lt;&#x2F;S")
            .replace(/<\/s/g, "&lt;&#x2F;s")
        : // .replace(/</g, "&lt;")
          // .replace(/>/g, "&gt;")
          // .replace(/"/g, "&quot;")
          // .replace(/'/g, "&#x27;")
          s ?? "";
      //.replace(/&/g, "&amp")
      //.replace(/\//g, '&#x2F;')
    },

    buildVerifiedBadge: () => {
      let text = Appio.config.textVerified,
        tooltip;
      if (text?.toLowerCase()?.startsWith("tooltip:")) {
        text = text.substring(8).trim();
        tooltip = true;
      }
      return `<div class="appio-review-verified${
        tooltip ? " appio-tooltip" : ""
      }"><svg><use href='#appio-icon-verified'></use></svg>${
        //}"><img src="${Appio.host}/storefront/verified.svg">${
        text
          ? `<span${
              tooltip ? ` class="appio-tooltiptext"` : ""
            } appio-text>${text}</span>`
          : ""
      }</div>`;
    },

    buildReviewsSection: (allrvs, reviews, more) => {
      if (!allrvs && !Appio.config.showBody) return "";
      let layout = Appio.config.widgetLayout;
      allrvs && layout != "list" && layout != "grid" && (layout = "list");
      let html = "";
      const isCard = layout == "grid" || layout == "roll" || layout == "line";
      const isSwipe = layout == "slide" || layout == "roll";
      const isSlide = layout == "slide";
      const isList = layout == "list";
      const startIndex = (Appio.data.page - 1) * Appio.config.pageSize;
      !reviews && (reviews = Appio.reviews);
      reviews?.forEach((review, index) => {
        if (
          !allrvs &&
          !Appio.config.paginationType.includes("more") &&
          index >= Appio.config.pageSize
        )
          return;
        if (startIndex + index >= Appio.limitReviews) return;
        const myLike = Appio.getReviewLiked(review.id);
        myLike.time &&
          review.likedTime < myLike.time &&
          (review.liked = myLike.count);
        review.liked = Math.max(+review.liked || 0, 0);
        const medias = Appio.xssEscape(
          (review.images || "") +
            "," +
            ((!Appio.isFreePlan &&
              !Appio.isEssentialPlan &&
              review.videos?.split(",")?.[0]) ||
              "")
        )
          .split(",")
          .slice(0, Appio.limitPhoto || 10)
          .filter((src) => src.length);
        html += `<div class="appio-review-item-holder${
          isSwipe ? " swiper-slide" : ""
        }">
      <div class="appio-review-item"${isCard ? " card" : ""} reviewid="${
          review.id
        }">`;
        if (isCard && medias?.length && Appio.config.showPhotoVideo) {
          html += `<div class="appio-review-item-media-box-top">`;
          medias.forEach((src) => {
            html += Appio.buildMediaTag({ src, isThumb: true });
          });
          html += `</div>${
            medias.length > 1
              ? `<div class="appio-review-media-count"><div>${medias.length}</div><div>${medias.length}</div></div>`
              : ""
          }`;
        }
        const country = review.country?.split("/")[0].toLowerCase();
        const backgroundPos =
          Appio.config.showReviewerCountry &&
          country &&
          ((p) => {
            return p >= 0
              ? `${-(p % 20) * 20}px -${Math.floor(p / 20) * 15}px`
              : "";
          })(Appio.countries.indexOf(country));
        const _name = `<div class="appio-review-item-name">${
          backgroundPos
            ? `<div class="appio-review-flag-nation" style="background-position: ${backgroundPos}"></div>`
            : ""
        }${
          Appio.config.showReviewerName ? Appio.xssEscape(review.customer) : ""
        }
      </div>`;
        const _date = Appio.config.showReviewDate
          ? `<div class="appio-review-item-date" data-date="${Appio.xssEscape(
              review.createdAt
            )}">${Appio.xssEscape(Appio.formatDate(review.createdAt))}</div>`
          : ``;
        const _verified =
          (review.isVerified || review.purchaseVerified) &&
          Appio.config.showVerifiedBadge
            ? Appio.buildVerifiedBadge()
            : "";
        const _rating = `${Appio.buildStarRating(review.rating)}`;
        let _row1 = "",
          _row2 = "",
          _row3 = "";
        if (isCard) {
          _row1 = `${_name}${_verified}`;
          _row2 = `${_rating}${_date}`;
        } else if (isSlide) {
          _row1 = `${_name}${_date}${_verified}`;
          _row2 = `${_rating}`;
        } else {
          _row1 = `${_name}${_date}`;
          _row2 = `${_rating}${_verified}`;
        }
        html += `<div class="appio-review-item-main">
      <div class="appio-review-row">${_row1}</div>
      <div class="appio-review-row">${_row2}</div>${_row3}
      ${
        review.title && Appio.config.showReviewTitle
          ? `<span class="appio-review-item-title">${Appio.xssEscape(
              Appio.correctReviewTitle(review.title)
            )}</span>`
          : ""
      }`;

        if (isSlide && medias?.length && Appio.config.showPhotoVideo) {
          html += '<div class="appio-review-item-media-box">';
          medias.forEach((src) => {
            html += Appio.buildMediaTag({ src, isThumb: true });
          });
          html += "</div>";
        }

        Appio.config.showReviewContent &&
          (html += `<div class="appio-review-body-wrap"><div class="appio-review-item-body">${Appio.xssEscape(
            review.body
          )}</div></div>`);

        if (isList && medias?.length && Appio.config.showPhotoVideo) {
          html += '<div class="appio-review-item-media-box">';
          medias.forEach((src) => {
            html += Appio.buildMediaTag({ src, isThumb: true });
          });
          html += "</div>";
        }

        Appio.config.showLikeReview &&
          (html += `<div class="appio-review-helpful">
      <span class="appio-review-helpful-inline" reviewid=${review.id} likes=${
            review.liked
          }${myLike.isLiked ? ' liked="1"' : ""}>
        <svg width="16" height="16" viewBox="0 0 14 13"><path d="m0 12.727h2.5455v-7.6364h-2.5455v7.6364zm14-7c0-0.7-0.57273-1.2727-1.2727-1.2727h-4.0091l0.63636-2.9273v-0.19091c0-0.25455-0.12727-0.50909-0.25455-0.7l-0.7-0.63636-4.2 4.2c-0.25455 0.19091-0.38182 0.50909-0.38182 0.89091v6.3636c0 0.7 0.57273 1.2727 1.2727 1.2727h5.7273c0.50909 0 0.95455-0.31818 1.1455-0.76364l1.9091-4.5182c0.063636-0.12727 0.063636-0.31818 0.063636-0.44545v-1.2727h0.063636v0z"/></svg>
        <span class="liked-number">${Appio.buildLikeContent(
          myLike.isLiked,
          review.liked
        )}</span>
      </span>
        </div>`);

        html += "</div>";

        Appio.config.showReply &&
          review.reply &&
          (html += `<div class="appio-reply-box">
        ${
          Appio.config.textShopReply
            ? `<h3 appio-text>${Appio.config.textShopReply}</h3>`
            : ""
        }
        <span>${Appio.xssEscape(review.reply)}</span></div>`);

        (allrvs ||
          Appio.isAllReviewsPage ||
          (Appio.isFeaturedWidget && Appio.config.featuredShowProduct)) &&
          review.productTitle &&
          (html += `<div class="appio-review-product-title"><a rendered href="${
            Appio.isUIPreview
              ? "#"
              : Appio.xssEscape(
                  review.onlineStoreUrl || `/products/${review.productHandle}`
                )
          }" appio-text>${Appio.xssEscape(review.productTitle)}</a></div>`);

        html += "</div></div>";
      });
      isSwipe &&
        reviews.length > 0 &&
        (html = `<div class="swiper-wrapper">${html}</div><div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>`);
      const boxClass = allrvs ? ".appio-allrvs-box" : ".appio-reviews-box";
      if (allrvs) {
        if (!html)
          //display empty state for allrvs box
          html = `<div class="appio-center-box" style="padding-top:10%;flex-direction: column;">
        <img src="${Appio.host}/storefront/empty.png" style="object-fit:none;margin-bottom:20px;" onerror="this.style.display='none'">
        <p>Stay tuned for our awesome reviews.<br>They will appear here in no time.<br><b>Shop till you drop!</b></p></div>`;
        !reviews?.length || more === false
          ? $(".appio-allrvs-section").attr("nomore", "")
          : $(".appio-allrvs-section").removeAttr("nomore");
      }
      $(boxClass).html(html).attr(layout, "");
      if (reviews?.length > 0) {
        Appio.buildGrid(allrvs);
        $(boxClass + " .appio-review-media-item:not([has-click])")
          .attr("has-click", "")
          .click(function (e) {
            Appio.swiperReviews?.autoplay.stop();
            Appio.showImage(e.target);
          });
        $(".appio-review-helpful-inline:not([has-click])")
          .attr("has-click", "")
          .click(function () {
            Appio.toggleLikeReview(this);
          });
        Appio.checkFormatDate();
        Appio.checkLazyLoad(allrvs);
        Appio.checkReadMore(boxClass);
        Appio.observeResizing();
        !Appio.isBuilding && Appio.translate(reviews);
        !allrvs && Appio.checkReviewSwiper();
      }
    },

    correctReviewTitle: (title) =>
      title.startsWith("((") && title.includes("))")
        ? title.substring(title.indexOf("))") + 2).trim()
        : title,

    buildLikeContent: (isLiked, likes) => {
      //isLiked && (likes = likes || 1);
      return `${likes > 0 ? likes : isLiked ? "1" : ""}${
        !isLiked && Appio.config.textLikeReview
          ? `${likes > 0 ? "<i></i>" : ""}<span appio-text>${
              Appio.config.textLikeReview
            }</span>`
          : ""
      }`;
    },

    checkReadMore: (boxClass = ".appio-reviews-box") => {
      //if (!["grid", "roll", "line"].includes(Appio.config.widgetLayout)) return;
      setTimeout(() => {
        $(boxClass + " .appio-review-body-wrap").each(function () {
          if (this.scrollHeight > this.clientHeight + 10)
            $(this)
              .attr("has-click", "")
              //.attr("readmore", "")
              .off("click")
              .on("click", () => {
                //show full review
                const reviewItem = $(this).closest(
                  ".appio-review-item-main"
                )[0];
                if (reviewItem.savedParent) return;
                reviewItem.savedParent = reviewItem.parentElement;
                reviewItem.index = $(reviewItem).index();
                Appio.preventCardsArrange = true;
                Appio.showMessage({
                  html: reviewItem,
                  closeButton: "",
                  onHide: () => {
                    Appio.preventCardsArrange = false;
                    reviewItem.index > 0
                      ? $(reviewItem.savedParent)
                          .children(":first")
                          .after(reviewItem)
                      : $(reviewItem.savedParent).prepend(reviewItem);
                    delete reviewItem.savedParent;
                  },
                });
              });
          else $(this).removeAttr("readmore").off("click");
        });
      }, 1000);
    },

    toggleLikeReview: (element) => {
      const $like = $(element);
      const reviewId = $like.attr("reviewid");
      const toggle = $like.attr("toggle") == 1;
      const liked = $like.attr("liked") == 1;
      const likes = +$like.attr("likes");
      const newToggle = !toggle;
      const newLiked = !liked;
      const newLikes = (newLiked ? 1 : -1) + likes;

      $like
        .attr({
          toggle: newToggle ? 1 : 0,
          liked: newLiked ? 1 : 0,
          likes: newLikes,
        })
        .children(".liked-number")
        .html(Appio.buildLikeContent(newLiked, newLikes));

      Appio.getReviewLiked({
        reviewId,
        likes: newLikes,
        action: newLiked ? "like" : "dislike",
      });

      if (!Appio.isUIPreview) {
        Appio.timerLikeReview
          ? Appio.timerLikeReview[reviewId] &&
            (clearTimeout(Appio.timerLikeReview[reviewId]),
            delete Appio.timerLikeReview[reviewId])
          : (Appio.timerLikeReview = {});
        newToggle &&
          (Appio.timerLikeReview[reviewId] = setTimeout(() => {
            Appio.doFetch({
              url: "/apps/appio/review/like-review",
              data: {
                productId: "" + Appio.data.productId,
                reviewId,
                isLiked: newLiked,
              },
              callback: (data) => {
                $like.removeAttr("toggle");
                if (data.ok) {
                } else {
                  //reset status
                  $like
                    .attr({ liked: liked ? 1 : 0, likes })
                    .children(".liked-number")
                    .html(Appio.buildLikeContent(liked, likes));
                }
              },
            });
            delete Appio.timerLikeReview[reviewId];
          }, 1000));
      }
    },

    checkFormatDate: () => {
      if (Appio.momentLoaded || Appio.config.showReviewDate === false) return;
      Appio.formatDatePending = () => {
        $(".appio-review-item-date").each(function () {
          $(this).html(Appio.formatDate($(this).data("date")));
        });
        Appio.formatDatePending = null;
      };
      //Appio.momentLoaded && Appio.formatDatePending();
    },

    checkLazyLoad: (allrvs) => {
      //Check for running LazyLoad
      Appio.lazyLoadedPending = () => {
        try {
          Appio.lazyLoad = new LazyLoad({
            class_applied: "lz-applied",
            class_loading: "lz-loading",
            class_loaded: "lz-loaded",
            class_error: "lz-error",
            class_entered: "lz-entered",
            class_exited: "lz-exited",
            callback_loaded: () => {
              Appio.buildGrid(allrvs);
            },
          });
        } catch (error) {
          Appio.log(`lazyLoadedPending error: ${error}`);
        }
        Appio.lazyLoadedPending = null;
      };
      Appio.lazyLoadLoaded && Appio.lazyLoadedPending();
    },

    checkSwiperLoop: () => {
      window._timerCheckSwiperLoop &&
        (clearTimeout(window._timerCheckSwiperLoop),
        delete window._timerCheckSwiperLoop);
      window._timerCheckSwiperLoop = setTimeout(() => {
        if (Appio.config.widgetLayout == "roll") {
          //await Appio.delay(200);
          const boxClass = ".appio-reviews-box";
          const wItem = $(boxClass + " .appio-review-item-holder").width();
          const check =
            Math.min(Appio.reviews.length, Appio.config.pageSize) * wItem >
            $(boxClass).width();
          if (check != (Appio.isLoopSwiper ?? false)) {
            Appio.isLoopSwiper = check;
            Appio.buildReviewsSection();
          }
        }
      }, 200);
    },

    checkReviewSwiper: () => {
      //Check for building Swiper
      if (
        Appio.config.widgetLayout == "roll" ||
        Appio.config.widgetLayout == "slide"
      ) {
        Appio.swiperLoadedPending = async () => {
          delete Appio.swiperLoadedPending;
          const loop = Appio.isLoopSwiper ?? false;
          const config = Object.assign(
            {
              loop,
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              autoHeight: true,
              on: {
                slideChange: function (ev) {
                  $(ev.el)
                    .find(".appio-review-media-item:not([has-click])")
                    .attr("has-click", "")
                    .click(function (e) {
                      Appio.swiperReviews?.autoplay.stop();
                      Appio.showImage(e.target);
                    });
                },
              },
            },
            Appio.config.widgetLayout == "slide"
              ? {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  autoplay: {
                    delay: Appio.config.slideDelay * 1000,
                  },
                  centeredSlides: true,
                  initialSlide: 0,
                }
              : {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  breakpointsBase: "container",
                  breakpoints: {
                    510: {
                      slidesPerView: Math.min(
                        2,
                        Appio.reviews?.length || 1,
                        Appio.config.pageSize
                      ),
                      spaceBetween: Appio.isMobile ? 10 : 20,
                    },
                    768: {
                      slidesPerView: Math.min(
                        3,
                        Appio.reviews?.length || 1,
                        Appio.config.pageSize
                      ),
                      spaceBetween: Appio.isMobile ? 10 : 20,
                    },
                    992: {
                      slidesPerView: Math.min(
                        4,
                        Appio.reviews?.length || 1,
                        Appio.config.pageSize
                      ),
                      spaceBetween: Appio.isMobile ? 10 : 20,
                    },
                  },
                }
          );
          if (Appio.isLoopSwiper == undefined) {
            config.on.afterInit = Appio.checkSwiperLoop;
            config.on.resize = Appio.checkSwiperLoop;
          } // else delete Appio.isLoopSwiper;
          $(".appio-reviews-box").attr({ loop });
          Appio.swiperReviews = new Swiper(".appio-reviews-box", config);
        };
        Appio.swiperLoaded && Appio.swiperLoadedPending();
      }
    },

    checkSizeChange: (rebuildStyle) => {
      let W = $(Appio.widgetElement).width();
      (!W ||
        (W > Appio.container.offsetWidth && Appio.container.offsetWidth > 0)) &&
        (W = Appio.container.offsetWidth);
      const sizeMode = W < 500 ? "S" : W < 700 ? "M" : "L";
      if (sizeMode == Appio.sizeMode) {
        if (!Appio.isUIPreview) return false;
      } else
        return (
          (Appio.sizeMode = sizeMode),
          rebuildStyle && Appio.buildStyles(true),
          sizeMode
        );
    },

    buildStyles: (force, forceMobile) => {
      if (
        !force &&
        !Appio.checkSizeChange() &&
        !Appio.isUIPreview &&
        Appio.renderStyles
      )
        return;

      Appio.isMobile =
        forceMobile ||
        Appio.forceMobile ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        Appio.sizeMode == "S";
      Appio.CARD_MIN_WIDTH =
        Appio.sizeMode == "S" ? Appio.config.mobileCardMinWidth || 180 : 250;

      let styles = `:root {
  --appio-box-border-color: rgba(0,0,0,0.1);
  --appio-button-border-color: rgba(0,0,0,0.2);
  --appio-button-border-radius: ${
    Appio.config.layoutShape == "rounded"
      ? Appio.config.cornerRadius + "px"
      : Appio.config.layoutShape == "circle"
      ? "20px"
      : 0
  }!important;
  --appio-fontsize: ${
    Appio.config.fontSize ? `${Appio.config.fontSize}px` : "inherit"
  };
  --appio-fontsize-header: ${
    Appio.config.fontSize
      ? `${Math.round((Appio.config.fontSize * 26) / 15)}px`
      : "26px"
  };
  --appio-fontsize-sub: ${
    Appio.config.fontSize
      ? `${Math.round((Appio.config.fontSize * 13) / 15)}px`
      : "13px"
  };
  --appio-average-rating-border-radius: ${
    Appio.config.layoutShape == "rounded"
      ? Appio.config.cornerRadius + "px"
      : Appio.config.layoutShape == "circle"
      ? "100px"
      : 0
  }!important;
  --appio-review-card-border-radius: ${
    Appio.config.layoutShape == "rounded"
      ? Appio.config.cornerRadius + "px"
      : Appio.config.layoutShape == "circle"
      ? "20px"
      : 0
  }!important;
  --appio-review-card-fill: ${
    Appio.config.colorBackground ? Appio.config.colorBackground : "white"
  }!important;
  --appio-readmore-fill: ${
    Appio.config.colorBackground ? Appio.config.colorBackground : "#ffffff"
  }!important;
  --appio-readmore-fill: ${
    Appio.config.colorBackground ? Appio.config.colorBackground : "#ffffff"
  }!important;
  --appio-star-size: ${
    Appio.config.starSize ? `${Appio.config.starSize}px` : "1.1em"
  }!important;
  --appio-star-color: ${Appio.config.colorStar}!important;
  --appio-average-color: ${
    Appio.config.colorAverage ||
    (Appio.contrast("#ffffff", Appio.config.colorStar) < 1.5
      ? "#000000"
      : "#ffffff")
  }!important;
  --appio-highlight-color: ${
    Appio.contrast(Appio.config.colorStar, "#ffffff") < 1.33
      ? Appio.contrast(Appio.config.colorButtonBackground, "#ffffff") < 1.33
        ? "#ff8800"
        : Appio.config.colorButtonBackground
      : Appio.config.colorStar
  }!important;
  --appio-border-size: ${Appio.config.borderSize || 0}px!important;
  --appio-border-button: ${
    Appio.config.borderSize
      ? `${Appio.config.borderSize}px solid ${
          Appio.config.colorBorderButton
            ? Appio.config.colorBorderButton
            : Appio.darkenColor(Appio.config.colorButtonBackground)
        }`
      : "_"
  }!important;
  --appio-border-average: ${
    Appio.config.borderSize
      ? `${Appio.config.borderSize}px solid ${
          Appio.config.colorBorderAverage
            ? Appio.config.colorBorderAverage
            : Appio.darkenColor(Appio.config.colorStar)
        }`
      : "0"
  }!important;
  --appio-border-review: ${
    Appio.config.borderSize /* || Appio.config.colorBackground*/
      ? `${Appio.config.borderSize}px solid ${
          Appio.config.colorBorderReview
            ? Appio.config.colorBorderReview
            : Appio.darkenColor(Appio.config.colorBackground || "#ffffff")
        }`
      : "0"
  }!important;
  --appio-border-review-card: max(1px,${
    Appio.config.borderSize || 0
  }px) solid ${
        Appio.config.colorBorderReview
          ? Appio.config.colorBorderReview
          : Appio.config.colorBackground
          ? Appio.darkenColor(Appio.config.colorBackground || "#ffffff")
          : `var(--appio-box-border-color)`
      }!important;
  --appio-action-button-fill: ${Appio.config.colorButtonBackground}!important;
  --appio-action-button-color: ${
    Appio.config.colorButtonText ||
    (Appio.contrast("#ffffff", Appio.config.colorButtonBackground) < 1.5
      ? "#000000"
      : "#ffffff")
  }!important;
  --appio-color-text: ${
    Appio.config.colorText ? Appio.config.colorText : "inherit"
  }!important;
  --appio-color-background: ${
    Appio.config.colorBackground ? Appio.config.colorBackground : "inherit"
  }!important;
  --appio-rating-badge-background: ${
    Appio.config.ratingBadgeBackground
      ? Appio.config.ratingBadgeBackground
      : "unset"
  }!important;
  --appio-rating-badge-color: ${
    Appio.config.ratingBadgeColor ? Appio.config.ratingBadgeColor : "unset"
  }!important;
  --appio-rating-badge-padding: ${
    Appio.config.ratingBadgeBackground
      ? "calc(var(--appio-star-size)/9 - 2px) calc(var(--appio-star-size)/9 + 5px)"
      : ""
  }!important;
  --appio-verified-color: ${
    Appio.config.colorVerifiedBadge || "#1c96e9"
  }!important;
  --appio-thumb-size: ${Appio.config.thumbSize || 80}px!important;
  --appio-reply-color: ${
    Appio.config.colorReply || "var(--appio-color-text)"
  }!important;
  --appio-title-color: ${Appio.config.colorTitle || ""}!important;
  --appio-review-lines: ${Appio.config.maxLines}!important;
  --appio-readmore: "… ${Appio.config.textReadMore || ""}"!important;
}
${
  Appio.isUIPreview
    ? ""
    : `body:has(.appio-backdrop[show]) {
      padding-right: var(--appio-scrollbar-width);
      overflow: hidden;
    }`
}
#appio-review-rating label:before {
  font-family: AppioSymbols;
  content: "${Appio.config.ratingIcon.charAt(1)}";
}
#appio-review-rating input:checked ~ label:before {
  content: "${Appio.config.ratingIcon.charAt(0)}";
}
#appio-review-rating:hover label:before {
  content: "${Appio.config.ratingIcon.charAt(1)}" !important;
}
#appio-review-rating input:hover ~ label:before {
  content: "${Appio.config.ratingIcon.charAt(0)}" !important;
}
.appio-review-flag-nation {
  background-image: url(${Appio.host}/storefront/flags-small.png);
}
.appio-paging-box {
  justify-content: ${
    Appio.config.paginationType.includes("left")
      ? "left"
      : Appio.config.paginationType.includes("right")
      ? "right"
      : "center"
  };
}
${
  Appio.config.widgetLayout == "list" &&
  (Appio.config.colorBackground || Appio.config.borderSize)
    ? `
.appio-body[list] .appio-review-item-holder:not(:first-child) {
  border: 0;
}
.appio-review-item {
  padding: 0 20px;
}`
    : ""
}
${
  Appio.config.widgetLayout == "list"
    ? `
.appio-body[list] .appio-review-item-holder {
  border-color: ${Appio.config.colorBackground ? "transparent!important" : "_"};
}`
    : ""
}
${
  Appio.config.colorWidgetBackground
    ? `
.appio-reviews-widget {
  padding: 1px 30px;
  background: ${Appio.config.colorWidgetBackground};
  border-radius: calc(1.5*var(--appio-button-border-radius));
}`
    : ""
}
${
  Appio.config.colorWidgetText
    ? `
.appio-reviews-widget {
  color: ${Appio.config.colorWidgetText};
}`
    : ""
}
${
  Appio.config.widgetLayout == "slide" /* && !Appio.isUIPreview*/
    ? `
.appio-review-flag-nation {
  margin-top: 3px;
}
`
    : ""
}
${
  Appio.sizeMode != "L" /* activate narrow display mode */
    ? `
.appio-filter-box {
  text-align: center;
  margin: 15px;
  width: 100%;
}
.appio-filter-box table {
  width: 80%;
}
.appio-header-box {
  flex-direction: column;
  align-items: center;
}
.appio-rating-average {
  margin: 0;
}
.appio-review-box {
  width: 100%;
}
#appio-review-rating label {
  font-size: 18px!important;
}
#appio-review-rating {
  margin-right: 10px!important;
}
.appio-review-rating-notify {
  font-size: 14px!important;
}
.appio-rating-text {
  margin-top: 8px;
}
`
    : ""
}
${
  !Appio.config.showAverageRating && Appio.sizeMode == "L"
    ? `
.appio-filter-box {
  align-items: start;
}
.appio-filter-box-inline {
  margin: 0;
}
`
    : ""
}
${Appio.config.textCustomizeCSS}
`;

      !$("#appioFlexibleStyle").length &&
        $("head").append(`<style id="appioFlexibleStyle"></style>`);
      $("#appioFlexibleStyle").html(styles);
      Appio.renderStyles = true;
    },

    buildReviewsPopup: () => {
      if (
        !(Appio.productRating.total > "0") ||
        !Appio.config.ratingDetailsPopup
      )
        return;
      let html = "";
      html += `<div class="appio-review-popup">
      <div class="appio-popup-header">
        <div class="appio-popup-header-score">
          <span>${Appio.productRating.average}</span> / 5</div>
        <div class="appop-popup-header-review-count" appio-text>${
          Appio.productRating.total
        } ${
        Appio.productRating.total > "1"
          ? Appio.config.textReviews
          : Appio.config.textReview
      }</div>
      </div>`;
      html += Appio.buildFilterBox("popup");
      html += `<div class="appio-popup-footer">
        <span appio-text>${Appio.config.textSeeReviews}</span>
          <svg fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "></polygon></svg>
      </div>
      `;
      $(".appio-rating-major .appio-rating-content").append(html);
    },

    buildFilterBox: (popup) => {
      const filtersType =
        popup &&
        (Appio.config.showReviewFilters == "button" ||
          !Appio.config.showReviewFilters)
          ? "star"
          : Appio.config.showReviewFilters;
      if (!filtersType) return "";
      let html = '<div class="appio-filter-box">';
      if (Appio.productRating.total > "0" && Appio.productRating.count) {
        const totalForPercent = parseInt(
          Appio.productRating.count.reduce((a, b) => +a + +b)
        );
        let _html = "";
        for (let i = 5; i >= 1; i--) {
          _html +=
            filtersType == "button"
              ? `<button type="button" ${
                  Appio.productRating.count[i - 1] > 0 ? "" : "disabled "
                }class="appio-filter-item" filter="${i}">${i} ${Appio.buildStarRating(
                  -1
                )} (${Appio.productRating.count[i - 1]})</button>`
              : `<div class="appio-rating-line-star" ${
                  Appio.productRating.count[i - 1] > 0 ? "" : "disabled "
                } filter="-${i}" ${filtersType}>${
                  filtersType == "number"
                    ? `${i}${Appio.buildStarRating(-1)}`
                    : Appio.buildStarRating(i)
                }</div>
            <div class="appio-rating-line-bar">
              <div class="appio-rating-line-sub" style="width:${
                Appio.productRating.count[i - 1]?.endsWith?.("%")
                  ? Appio.productRating.count[i - 1]
                  : `${
                      (Appio.productRating.count[i - 1] * 100) / totalForPercent
                    }%`
              }">
              </div>
            </div>
            <div class="appio-rating-line-qty appio-col3" count="${parseInt(
              Appio.productRating.count[i - 1]
            )}" filter="-${i}">
              ${
                Appio.productRating.realTotal == Appio.productRating.total ||
                Appio.productRating.count[i - 1]?.endsWith?.("%")
                  ? Appio.productRating.count[i - 1]
                  : Math.round(
                      (parseInt(Appio.productRating.count[i - 1]) * 100) /
                        totalForPercent
                    ) + "%"
              }
            </div>  
            `;
        }
        if (filtersType == "button") {
          html += `<button type="button" ${
            Appio.productRating.total > "0" ? "" : "disabled "
          }class="appio-filter-item" active filter="all">${
            Appio.config.textAll
          } (${Appio.productRating.total})
    </button><button type="button" ${
      Appio.productRating.totalWithMedia > 0 ? "" : "disabled "
    }class="appio-filter-item" filter="media">With photo/video (${
            Appio.productRating.totalWithMedia
          })</button>
    <br>${_html}`;
        } else {
          html += `<div class="appio-filter-box-inline appio-grid-container">${_html}</div>`;
        }
      } else if (Appio.config.showReviewButton) {
        html += `<span class="appio-center-box appio-write-1st" appio-text>${Appio.config.textReviewButtonNone}</span>`;
      }
      html += "</div>";
      return html;
    },

    buildMediaList: () => {
      if (
        Appio.isFeaturedWidget ||
        !Appio.config.showMediaList ||
        (Appio.reviewsMedia && !Appio.isUIPreview)
      )
        return "";
      Appio.reviewsMedia = {};
      let html = "";
      Appio.reviews?.forEach((review) => {
        Appio.xssEscape(
          (review.images || "") + "," + (review.videos?.split(",")?.[0] || "")
        )
          .split(",")
          .map((src) => {
            if (src.length) {
              Appio.reviewsMedia[review.id] = review;
              html += Appio.buildMediaTag({
                src,
                reviewId: review.id,
                isThumb: true,
              });
            }
          });
      });
      return `<div class="appio-media-list">${html}</div>`;
    },

    buildReviewsHeader: () => {
      const branding = Appio.showLogo
        ? `<div class="appio-powered-by">${
            Appio.isUIPreview
              ? `<style>.appio-remove-brand{animation: sizing 2s linear infinite;}
@keyframes blink{0%{opacity: 1;}50%{opacity: 1;}51%{opacity: 0;}100%{opacity: 0;}}
@keyframes sizing{0%{transform:scale(1,1);}50%{transform:scale(0.95,0.95);}100%{transform:scale(1,1);}}</style>
<div class="appio-remove-brand" onclick="Appio.removeBranding?.()">How to remove the brand logo?
<svg height="50" width="60" viewBox="0 0 179.019 179.019" xmlns="http://www.w3.org/2000/svg">
<path style="transform-origin: 50% 50%;" fill="#3399dd" d="M 141.508 90.801 C 140.919 91.559 139.815 91.559 139.046 90.801 L 129.276 81.115 C 132.009 113.492 111.106 139.53 81.859 139.53 C 67.4 139.53 53.114 133.255 41.608 121.863 C 40.839 121.106 40.7 119.874 41.299 119.117 C 41.889 118.355 42.998 118.355 43.762 119.117 C 54.522 129.771 67.891 135.64 81.407 135.64 C 109.281 135.64 129.123 110.364 125.655 79.283 L 116.626 90.802 C 116.033 91.559 114.929 91.559 114.159 90.802 C 113.398 90.039 113.259 88.808 113.85 88.051 L 125.809 72.798 L 141.203 88.051 C 141.967 88.807 142.106 90.039 141.508 90.801 Z" transform="matrix(0.017453, 0.999848, -0.999848, 0.017453, -0.000009, -0.000005)"></path>
</svg></div>`
              : ""
          }${
            Appio.isUIPreview
              ? '<a href="javascript:Appio.removeBranding?.()">'
              : '<a target="_blank" href="https://apps.shopify.com/product-reviews-by-appio?utm_source=web&utm_medium=storefront&utm_campaign=logo">'
          }Powered by <img src="${
            Appio.host
          }/storefront/appio-logo.png"></a></div>`
        : "";
      if (
        !Appio.isAllReviewsPage &&
        (!Appio.config.showHeader ||
          (Appio.config.hideHeaderWhenNoReview &&
            !(Appio.productRating.total > "0")))
      ) {
        $(".appio-header-container").html(
          !(Appio.productRating.total > "0") ? "" : branding
        );
        return;
      }
      let html =
        (Appio.config.showWidgetTitle &&
          Appio.config.textWidgetTitle?.length) ||
        branding
          ? `<div class="appio-title-row"><div class="appio-widget-title" appio-text>${
              Appio.config.showWidgetTitle ? Appio.config.textWidgetTitle : ""
            }</div>${branding}</div>`
          : "";
      let headerBox = "",
        actionButtons = "";
      const sortButton = `<button type="button" menu class="appio-sort-button">
      <div class="appio-menu" sort>
      <div class="appio-menu-title" appio-text>${Appio.config.textSortBy}</div>
      <div class="appio-menu-item" appio-text sort="featured">${Appio.config.textSortByFeatured}</div>
      <div class="appio-menu-item" appio-text sort="date">${Appio.config.textSortByTime}</div>
      <div class="appio-menu-item" appio-text sort="high">${Appio.config.textSortByHigh}</div>
      <div class="appio-menu-item" appio-text sort="low">${Appio.config.textSortByLow}</div>
      <div class="appio-menu-item" appio-text sort="photo">${Appio.config.textSortByPhoto}</div>
     </div></button>`;
      if (Appio.isAllReviewsPage || Appio.isFeaturedWidget) {
        if (Appio.isAllReviewsPage) {
          actionButtons =
            `<button type="button" menu review>
      <div class="appio-menu" filter-review>
        <div class="appio-menu-title" appio-text>${Appio.config.textReviews}</div>
        <div class="appio-menu-item" appio-text review="all" rating="any" active>${Appio.config.textAll}</div>
        <div class="appio-menu-line"></div>
        <div style="display: flex">
          <div>
            <div class="appio-menu-item" review="all" rating="5">5⭐</div>
            <div class="appio-menu-item" review="all" rating="4">4⭐</div>
            <div class="appio-menu-item" review="all" rating="3">3⭐</div>
            <div class="appio-menu-item" review="all" rating="2">2⭐</div>
            <div class="appio-menu-item" review="all" rating="1">1⭐</div>
          </div>
          <div style="border-left:1px solid #e0e0e0;padding-left:10px;margin:5px 0 0 20px">
            <div class="appio-menu-item" appio-text review="all" rating="positive">${Appio.config.textPositive}</div>
            <div class="appio-menu-item" appio-text review="all" rating="negative">${Appio.config.textNegative}</div>
            <div class="appio-menu-line"></div>
            <div class="appio-menu-item" appio-text review="media" rating="any">${Appio.config.textPhotoVideo}</div>
            <div class="appio-menu-item" appio-text review="verified" rating="any">${Appio.config.textVerified}</div>
          </div>
        </div>
      </div><span appio-text>${Appio.config.textReviews}</span><span class="appio-current-value" appio-text></span></button>` +
            `<button type="button" menu sort>
      <div class="appio-menu" sort>
      <div class="appio-menu-title" appio-text>${Appio.config.textSortBy}</div>
      <div class="appio-menu-item" appio-text sort="featured">${Appio.config.textSortByFeatured}</div>
      <div class="appio-menu-item" appio-text sort="date">${Appio.config.textSortByTime}</div>
      <div class="appio-menu-item" appio-text sort="high">${Appio.config.textSortByHigh}</div>
      <div class="appio-menu-item" appio-text sort="low">${Appio.config.textSortByLow}</div>
      <div class="appio-menu-item" appio-text sort="photo">${Appio.config.textSortByPhoto}</div>
     </div><span appio-text>${Appio.config.textSortBy}</span><span class="appio-current-value" appio-text></span></button>`;
        }
        (Appio.config.featuredShowReviewsCount || Appio.isAllReviewsPage) &&
          (html += `<div class="appio-reviews-summary">${
            Appio.reviewsTotal > 1
              ? `${
                  Appio.isFeaturedWidget ? Appio.buildStarRating(5) : ""
                }<span class="appio-total-review" appio-text>${
                  Appio.reviewsTotal
                } ${Appio.config.textReviews}</span>${
                  Appio.isFeaturedWidget && Appio.config.featuredLinkAllReviews
                    ? Appio.isUIPreview
                      ? ` | <span class="appio-show-all-review" appio-text>${Appio.config.textShowAll}</span>`
                      : Appio.isVIPPlan ||
                        Appio.config.allowedOptions?.includes(
                          "featuredLinkAllReviews"
                        )
                      ? ` | <a href="/pages/appio-reviews"><span class="appio-show-all-review" appio-text>${Appio.config.textShowAll}</span></a>`
                      : ""
                    : ""
                }`
              : ""
          }</div>`);
      } else {
        Appio.config.showReviewButton &&
          (actionButtons += `<button type="button" class="appio-review-button" appio-text>${Appio.config.textReviewButton}</button>`);
        Appio.config.allowSortReview &&
          Appio.productRating.total > "0" &&
          Appio.config.showBody &&
          (actionButtons += sortButton);
        if (Appio.config.showAverageRating) {
          if (Appio.productRating.total > "0") {
            headerBox += `<span class="appio-rating-box"><span class="appio-rating-average">${
              Appio.productRating.average
            }</span>
        ${
          Appio.config.showReviewFilters
            ? ""
            : Appio.buildStarRating(Appio.productRating.average)
        }
        <span class="appio-rating-text" appio-text>${Appio.config.textReviewSummary
          .replace(/#count/g, Appio.productRating.total)
          .replace(/#raters/g, Appio.productRating.total)
          .replace(/reviews_count/g, Appio.productRating.total)
          .replace(
            "#reviews",
            Appio.productRating.total < 2
              ? Appio.config.textReview
              : Appio.config.textReviews
          )
          .replace(/#rating/g, Appio.productRating.average)}</span></span>`;
          } else if (actionButtons?.trim().length)
            headerBox += Appio.buildStarRating(0);
        }
        headerBox += Appio.buildFilterBox();
      }
      actionButtons &&
        (headerBox += `<div class="appio-action-box">${actionButtons}</div>`);
      headerBox && (html += `<div class="appio-header-box">${headerBox}</div>`);
      html += Appio.buildMediaList();
      $(".appio-header-container").html(html);
      $(`.appio-menu-item[sort="${Appio.config.defaultSortReviewBy}"]`).attr(
        "active",
        ""
      );

      $(
        '.appio-filter-item, .appio-rating-line-star, .appio-rating-line-qty:not([count="0"]), .appio-menu-item'
      ).click(function () {
        const sort = $(this).attr("sort"),
          filter = $(this).attr("filter"),
          review = $(this).attr("review"),
          rating = $(this).attr("rating");
        (filter || review || rating) &&
          Appio.filterReviews({ filter, review, rating });
        sort && Appio.sortReviews(sort);
        if (this.className == "appio-menu-item") {
          $(this)
            .closest(".appio-menu")
            .find(".appio-menu-item[active]")
            .removeAttr("active");
          $(this)
            .attr("active", "")
            .closest("button[menu]")
            .find(".appio-current-value")
            .html($(this).html());
        }
      });

      $(".appio-action-box button[menu]")
        .click(function (event) {
          const menu = $(this).children(".appio-menu")[0];
          $(".appio-menu:visible").each(function () {
            if (this != menu) $(this).hide("fast");
          });
          event.stopPropagation();
          $(menu).toggle("fast");
          if (!Appio.clickOutSortMenu) {
            Appio.clickOutSortMenu = function (e) {
              var inside = e.target.closest(".appio-menu");
              if (!inside) {
                $(".appio-menu").hide("fast");
              }
            };
            document.addEventListener("click", Appio.clickOutSortMenu);
          }
        })
        .each(function () {
          const value = $(this).find(".appio-menu-item[active]").html();
          value && $(this).find(".appio-current-value").html(value);
        });

      $(".appio-media-list .appio-review-media-item:not([has-click])")
        .attr("has-click", "")
        .click(function (e) {
          Appio.swiperReviews?.autoplay.stop();
          Appio.showImage(e.target, true);
        });

      $(".appio-review-button, .appio-write-1st").click(
        Appio.showWriteReviewForm
      );
    },

    buildPreview: (previewConfig) => {
      Appio.setConfig(previewConfig);
      Appio.buildStyles(true);
      Appio.buildReviewsHeader();
      Appio.buildReviewsSection();

      if (Appio.isUIPreview) return;
      Appio.buildPagingSection();
      Appio.widgetElement?.scrollIntoView({
        behavior: "smooth",
      });
      //show preview notice
      let box = document.getElementById("appioPreviewNotice");
      if (box == null) {
        box = document.createElement("div");
        box.id = "appioPreviewNotice";
        box.innerHTML = `<p><img src = "${Appio.host}/storefront/appio-white-logo.png">Live-store preview mode&nbsp;|&nbsp;<a href="javascript:Appio.exitPreview()">Exit</a></p>`;
        document.body.appendChild(box);
      }
    },

    exitPreview: () => {
      location.href = location.origin + location.pathname;
    },

    /* validateInput: return 1 -> fail, 0 -> ok */
    validateInput: (element, message, validator) => {
      const valid = !!(typeof validator == "function"
        ? validator()
        : validator === undefined
        ? $(element).val()?.trim()
        : validator);
      if (element == "rating") {
        $(".appio-review-rating-notify").removeClass("rating-notify-alert");
        if (!valid) {
          Appio.starsAnimation();
          setTimeout(() => {
            $(".appio-review-rating-notify").addClass("rating-notify-alert");
          });
        }
      } else {
        element = $(element)[0];
        !element.id &&
          ((window.appioInputIdGenerator =
            (window.appioInputIdGenerator || 0) + 1),
          (element.id = `appioInput_${window.appioInputIdGenerator}`));
        const validateId = `validate_${element.id}`;
        $(element).removeClass("appio-error-input");
        if (valid) {
          $(`#${validateId}`).remove();
        } else if (message) {
          if (!window[validateId]) {
            $(
              `<div id="${validateId}" class="appio-validation-message">${message}</div>`
            ).insertAfter(element);
            $(element).blur(function () {
              Appio.validateInput(this, "", validator);
            });
          }
          setTimeout(() => {
            $(element).addClass("appio-error-input");
          });
        }
      }
      return 1 - valid;
    },

    delay: async (ms) => {
      await new Promise((r) => setTimeout(r, ms));
    },

    starsAnimation: async () => {
      if (Appio.starsAnimationRunning) return;
      Appio.starsAnimationRunning = true;
      await Appio.delay(1000);
      for (let j = 1; j <= 2; j++) {
        for (let i = 1; i <= 5; i++) {
          if (Appio.stopStarsAnimation) {
            Appio.stopStarsAnimation = false;
            Appio.starsAnimationRunning = false;
            return;
          }
          $(`label[for="appio-star${i}"]`).css({
            transform: "scale(1.3)",
            color: "#ff3860",
          });
          setTimeout(() => {
            $(`label[for="appio-star${i}"]`).css({ transform: "", color: "" });
          }, 200);
          await Appio.delay(100);
        }
        await Appio.delay(500);
      }
      Appio.starsAnimationRunning = false;
    },

    buildReviewForm: () => {
      $(Appio.container).append(Appio.formHtml());
      const $buttonSelectMedia = $(".appio-media-upload-button");
      const MAX_MEDIA_ITEMS = 5;
      const MAX_UPLOAD_VIDEO_SIZE = 20 * 1024 * 1024; //20MB
      const MAX_UPLOAD_IMAGE_SIZE = 4 * 1024 * 1024; //4MB

      async function onSubmitReview(event) {
        event?.preventDefault?.();

        let fail = 0;
        fail += Appio.validateInput(
          "rating",
          "",
          () => !!$('input[name="appio-review-input-rating"]:checked').val()
        );
        fail += Appio.validateInput(
          "#appio-review-input-body",
          Appio.config.textValidationContent
        );
        if (!Appio.reviewRequestId) {
          fail +=
            Appio.validateInput(
              "#appio-review-input-name",
              Appio.config.textValidationName
            ) +
            Appio.validateInput(
              "#appio-review-input-email",
              Appio.config.textValidationEmail,
              () =>
                !!$("#appio-review-input-email").val()?.trim() &&
                !!$("#appio-review-input-email")
                  .val()
                  .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            );
        }

        if (fail) return;

        $(".appio-button-submit-review").html(Appio.config.textSendingReview);
        $(".appio-review-form").css({ "pointer-events": "none", opacity: 0.5 });

        let isReviewSuccess;
        if (Appio.isUIPreview) {
          //simulate submit review
          await Appio.delay(1000);
          isReviewSuccess = true;
        } else {
          //Upload files
          let uploadSuccess = true;
          let media = [];
          await Promise.all(
            Appio.uploadFiles.map(async (file) => {
              if (!uploadSuccess) return;
              const { presignedPUTURL, uploadId } = await Appio.doFetch({
                url: `/apps/appio/review/get-media-upload-url?filename=${file.name}&filetype=${file.type}&product=${Appio.data.productId}`,
                method: "GET",
              });

              const resUpload = await fetch(presignedPUTURL, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                  "x-amz-acl": "public-read",
                },
                body: file,
              });

              if (resUpload.ok) {
                const url = new URL(presignedPUTURL);
                media.push(url.origin + url.pathname);
              } else {
                uploadSuccess = false;
              }
            })
          );

          if (!uploadSuccess) {
            Appio.showMessage(
              Appio.config.textUploadMediaFailed ||
                "Could not upload photo/video."
            );
            return;
          }

          const result = await submitReview(media);
          isReviewSuccess = result.status == 200;
        }
        const resultMessage = isReviewSuccess
          ? Appio.config.textReviewSuccess
          : Appio.config.textReviewFailed;
        Appio.showMessage({
          message: resultMessage,
          onAction: () => {
            if (Appio.reviewRequestId) {
              window.location.href = window.location.href.split("?")[0];
            }
          },
        });
        if (isReviewSuccess) {
          $(".appio-media-upload-item").remove();
          //reset values
          $(".appio-review-form input:checked").prop("checked", false);
          $(".appio-review-form [type=text]").val("");

          Appio.resetReviewRating();
          Appio.uploadFiles = [];
          Appio.hideWriteReviewForm();
        }
      }

      async function submitReview(media) {
        return await Appio.doFetch({
          url: "/apps/appio/review/add-review",
          data: {
            productId: "" + Appio.data.productId,
            rating: $('input[name="appio-review-input-rating"]:checked').val(),
            author: $("#appio-review-input-name").val(),
            email: $("#appio-review-input-email").val(),
            title: $("#appio-review-input-title").val(),
            body: $("#appio-review-input-body").val(),
            requestId: Appio.reviewRequestId,
            media,
          },
          readStream: false,
        });
      }

      $(".appio-review-box .appio-close-button").click(
        Appio.hideWriteReviewForm
      );

      //$(".appio-review-form").submit(onSubmitReview);
      $(".appio-button-submit-review").click(onSubmitReview);

      const uploadObj = $("#appio-media-upload-tmp")[0];
      if (uploadObj)
        uploadObj.onchange = function () {
          let issues = "";
          for (let i = 0; i < this.files.length; i++) {
            if (Appio.uploadFiles.length >= MAX_MEDIA_ITEMS) {
              issues = Appio.config.textValidationLimitFiles.replace(
                "##",
                MAX_MEDIA_ITEMS
              );
              break;
            }
            const file = this.files[i];
            const isImage = Appio.validImageTypes.includes(file.type),
              isVideo = Appio.validVideoTypes.includes(file.type),
              limitFileSize = isImage
                ? MAX_UPLOAD_IMAGE_SIZE
                : isVideo
                ? MAX_UPLOAD_VIDEO_SIZE
                : 0;
            if (limitFileSize && file.size > limitFileSize) {
              issues = `${file.name} - File size limit ${
                Math.round((limitFileSize * 10) / 1048576) / 10
              }M exceeded (${Math.round((file.size * 10) / 1048576) / 10}M)`;
              break;
            }
            if (isVideo) {
              if (Appio.hasVideoUploaded) {
                issues = Appio.config.textValidationLimitVideo;
                break;
              } else {
                Appio.hasVideoUploaded = true;
                $('.appio-media-upload-button input[type="file"]').attr(
                  "accept",
                  "image/jpeg,image/png,image/gif,image/webp"
                );
              }
            }
            if (isImage || isVideo) {
              Appio.uploadFiles.push(file);
              const $removeButton = $(
                '<div class="appio-media-remove-button">'
              );
              $removeButton.click(function () {
                const $mediaBox = $(this).parent();
                Appio.uploadFiles.splice($mediaBox.index(), 1);
                $buttonSelectMedia.show();
                $mediaBox.remove();
              });
              if (isImage) {
                const $previewImage = $("<img>");
                $previewImage.attr("src", URL.createObjectURL(file));
                $('<div class="appio-media-upload-item">')
                  .append($previewImage)
                  .append($removeButton)
                  .insertBefore($buttonSelectMedia);
              } else if (isVideo) {
                $('<div class="appio-media-upload-item">')
                  .html(
                    '<svg style="width: 20px;height: 20px;margin: 30px;"><use href="#appio-icon-video"></use></svg>'
                  )
                  .append($removeButton)
                  .insertBefore($buttonSelectMedia);
              }
            }
          }

          if (issues) Appio.showMessage(issues);

          Appio.uploadFiles.length >= MAX_MEDIA_ITEMS &&
            $buttonSelectMedia.hide();
        };

      $("input[type=radio][name=appio-review-input-rating]").change(function (
        event
      ) {
        const value = $(
          'input[name="appio-review-input-rating"]:checked'
        ).val();
        value > 0 && (Appio.stopStarsAnimation = true);
        $(".appio-review-rating-notify")
          .html(
            !value
              ? Appio.config.textRating
              : Appio.config[`textRating${value}`]
          )
          .removeClass("rating-notify-alert");
        $('label[for="' + event.target.id + '"]').attr("active", "");
        setTimeout(
          () => $('label[for="' + event.target.id + '"]').removeAttr("active"),
          500
        );
      });
      Appio.resetReviewRating();
    },

    buildProductReviews: () => {
      Appio.buildReviewsHeader();
      //check empty first page reviews
      if (Appio.productRating?.total > 0 && !Appio.reviews?.length)
        Appio.loadProductReviews({ page: 1, checkFirstPageReviews: true });
      else {
        Appio.buildReviewsSection();
        Appio.buildPagingSection();
      }
    },

    showRatingBadges: ($element) => {
      let selector = $element,
        majorTextAlign;
      if (!selector) {
        if (
          !Appio.config.badgeOnProductPage &&
          !Appio.config.badgeOnProductsList
        )
          return 0;
        else if (
          !Appio.config.badgeOnProductPage &&
          Appio.config.badgeOnProductsList
        )
          selector =
            ".appio-rating-badge:not([rendered]):not([data-id]):not(.appio-rating-major)";
        else if (
          Appio.config.badgeOnProductPage &&
          !Appio.config.badgeOnProductsList
        )
          selector = ".appio-rating-major:not([rendered]):not([data-id])";
        else selector = ".appio-rating-badge:not([rendered]):not([data-id])";
      }
      if ($element) {
        majorTextAlign =
          Appio.productTitleElement &&
          window.getComputedStyle(Appio.productTitleElement)?.textAlign;
      }
      let count = 0;
      $(selector).each(function () {
        const isMajor = $(this).hasClass("appio-rating-major");
        const _raters =
          (Appio.config.useImportSummary &&
            $(this).data("raters") > 0 &&
            $(this).data("amz_raters")) ||
          $(this).data("raters") ||
          0;
        const raters = parseInt(_raters),
          cardProductId = $(this).data("id"),
          ratingProductId = $(this).data("pid");
        if (
          (isMajor && !Appio.config.badgeOnProductPage) ||
          (!isMajor && !Appio.config.badgeOnProductsList) ||
          (ratingProductId && cardProductId && ratingProductId != cardProductId)
        )
          return;
        let rating =
          (Appio.config.useImportSummary && $(this).data("amz_rating")) ||
          $(this).data("rating") ||
          "0.0";
        (rating + "").length == 1 && (rating += ".0");
        if (!Appio.config.ratingBadgeHideEmpty || raters > 0) {
          let textAlign = majorTextAlign;
          if (!textAlign) {
            const c = window.getComputedStyle(this.parentElement);
            textAlign = c.textAlign.includes("center") // may be "center" or -webkit-center
              ? "center"
              : c.textAlign.includes("right") && c.direction !== "rtl"
              ? "right"
              : "";
          }
          $(this)
            .html(
              `<div class="appio-rating-content">${
                raters &&
                (isMajor || Appio.config.ratingSameFormat
                  ? Appio.config.showRatingProductDetails
                  : Appio.config.showRatingProductList)
                  ? `<div class="appio-rating">${rating}</div>`
                  : ""
              }
            ${Appio.buildStarRating(rating)}${
                raters
                  ? `<div class="appio-rating-raters" appio-text>${(isMajor ||
                    Appio.config.ratingSameFormat
                      ? Appio.config.ratingFormatProduct
                      : Appio.config.ratingFormatCollection
                    )
                      .replace("#count", _raters)
                      .replace("#raters", _raters)
                      .replace("reviews_count", _raters)
                      .replace("#rating", rating)
                      .replace(
                        "#reviews",
                        raters < 2
                          ? Appio.config.textReview
                          : Appio.config.textReviews
                      )
                      .replace(
                        "#word",
                        Appio.isVIPPlan
                          ? Appio.ratingWords[Math.round(rating)]
                          : ""
                      )
                      .replace(
                        "#icon",
                        Appio.isFreePlan
                          ? ""
                          : Appio.ratingIcons[Math.round(rating)]
                      )}</div>`
                  : ""
              }</div>`
            )
            .attr("rendered", "");
          textAlign && $(this).css("justify-content", textAlign);
          count++;
        }
      });
      count && !Appio.isBuilding && Appio.translate();
      return count;
    },

    loadCSSJS: async (url, callback) => {
      let promise = new Promise((resolve, reject) => {
        Appio.loadedFiles === undefined && (Appio.loadedFiles = []);
        if (Appio.loadedFiles.includes(url)) {
          resolve(url + " loaded already");
        } else {
          Appio.loadedFiles.push(url);
          const lcURL = new URL(url.toLowerCase());
          if (lcURL.pathname.endsWith(".css")) {
            const s = document.createElement("link");
            s.rel = "stylesheet";
            s.href = url;
            s.onload = () => {
              resolve(url + " loaded");
            };
            document.getElementsByTagName("head")[0].appendChild(s);
          } else if (lcURL.pathname.endsWith(".js")) {
            const s = document.createElement("script");
            s.defer = "defer";
            s.src = url;
            s.onload = () => {
              resolve(url + " loaded");
            };
            const a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(s, a);
          }
        }
      });
      let result = await promise;
      callback?.();
      Appio.log(result);
      return result;
    },

    checkAppioReady: (action) => {
      if (
        true &&
        Appio.config &&
        Appio.jqueryLoaded
        //&& Appio.swiperLoaded
        //&& Appio.momentLoaded
      ) {
        Appio.isReady = true;
        Appio.log("checkAppioReady ok");
        action && action();
        return true;
      }
      return false;
    },

    showMessage: (info) => {
      let message, button, onAction, onShow, onHide, html;
      typeof info == "string"
        ? (message = info)
        : ({ message, button, onAction, onShow, onHide, html } = info);
      const msgBox = document.createElement("div");
      msgBox.className = "appio-msg-box appio-backdrop";
      msgBox.style.zIndex = Appio.maxZIndex;
      msgBox.innerHTML = `<div class="appio-msg-main">${
        message
          ? `<p class="appio-message-content">${message.replace(
              /\n/g,
              "<br>"
            )}</p>${
              button == "_none"
                ? ""
                : `<button type="button" class="appio-message-button-ok">${
                    button ?? "OK"
                  }</button>`
            }`
          : ""
      }${html ? `<i class="appio-close-button"></i>` : ""}</div>`;
      if (typeof html == "object") {
        msgBox.querySelector(".appio-msg-main")?.appendChild(html);
      } else html && msgBox.querySelector(".appio-msg-main")?.html(html);
      Appio.container.appendChild(msgBox);
      const hideMsg = (action) =>
        Appio.hideBackdropBox(".appio-msg-box", () => {
          msgBox.remove();
          action?.();
          onHide?.();
        });
      if (onAction) {
        msgBox
          .querySelector(".appio-message-button-ok")
          ?.addEventListener("click", () => hideMsg(onAction));
      } else
        html
          ? msgBox
              .querySelector(".appio-close-button")
              ?.addEventListener("click", () => hideMsg())
          : msgBox?.addEventListener("click", () => hideMsg());
      Appio.showBackdropBox(".appio-msg-box");
      onShow?.();
    },

    checkParams: () => {
      if (Appio.urlParams === undefined) {
        Appio.urlParams = new Proxy(
          new URLSearchParams(window.location.search),
          {
            get: (searchParams, prop) => searchParams.get(prop),
          }
        );
      }
      if (Appio.urlParams.review == "edit") {
        Appio.pendingAction = () => Appio.showWriteReviewForm(true);
      }
      if (Appio.urlParams.token?.length == 36 && !window.process_token) {
        window.process_token = true;
        Appio.reviewRequestId = Appio.urlParams.token;
        Appio.pendingAction = () => {
          Appio.showWriteReviewForm(true);
          $(".appio-reviewer-wrapper").hide();
        };
      }
      if (Appio.urlParams.verified && !window.process_verified) {
        window.process_verified = true;
        Appio.showMessage(
          "You are successfully verified.\nYour review will be showed up here soon."
        );
        window.history.pushState({}, "", window.location.href.split("?")[0]);
      }
      if (
        Appio.urlParams.preview &&
        Appio.isReady &&
        !window.processedPreview
      ) {
        window.processedPreview = true;
        Appio.buildPreview(
          JSON.parse(atob(decodeURIComponent(Appio.urlParams.preview)))
        );
      }
    },

    log: (s) => {
      Appio.enableLogs && console.log(new Date().toISOString() + " " + s);
    },

    loadJQuery: async (callback) => {
      const loadedJQuery = () => {
        Appio.jqueryLoaded = true;
        typeof $ == "undefined" && ($ = jQuery.noConflict());
        Appio.log("jQuery loaded");
        callback?.();
      };
      if (Appio.config.waitForJquery > 0) {
        let t = 0;
        while (t < Appio.config.waitForJquery && typeof jQuery == "undefined") {
          await Appio.delay(100);
          t += 100;
        }
      }
      if (typeof jQuery == "undefined") {
        await Appio.loadCSSJS(
          "https://code.jquery.com/jquery-3.7.1.min.js",
          loadedJQuery
        );
      } else {
        loadedJQuery();
      }
    },

    loadSwiper: async (callback) => {
      if (Appio.swiperLoaded) return;
      const loadedSwiper = () => {
        Appio.swiperLoaded = true;
        //image display using swiper
        if (Appio.swiperMedia === undefined) {
          const $imgBox =
            $(`<div id="appio-img-box" class="appio-backdrop" style="z-index:${
              Appio.maxZIndex
            }">
  <div class="appio-swiper-media">
    <div class="swiper-wrapper"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>${
    Appio.config.showMediaList
      ? `<div class="appio-review-for-media"></div>`
      : ""
  }
  <i class="appio-close-button"></i>
</div>`);
          $(Appio.container).append($imgBox);
          $imgBox.find(".appio-close-button").click(() => {
            Appio.config.widgetLayout == "slide" &&
              Appio.swiperReviews.autoplay.start();
            Appio.stopAllVideo();
            Appio.hideBackdropBox("#appio-img-box");
          });
          $(".appio-review-for-media").click(function () {
            $(this).attr("small") == undefined
              ? $(this).attr("small", "")
              : $(this).removeAttr("small");
          });
          Appio.swiperMedia = new Swiper(".appio-swiper-media", {
            zoom: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            keyboard: {
              enabled: true,
            },
            on: {
              transitionStart: (swiper) => {
                Appio.timeoutSwiperMediaChanged &&
                  clearTimeout(Appio.timeoutSwiperMediaChanged);
                Appio.timeoutSwiperMediaChanged = setTimeout(() => {
                  Appio.stopAllVideo();
                  // console.log(
                  //   "SwiperMediaChanged, active index:" + swiper.activeIndex
                  // );
                  // check media list
                  if (Appio.config.showMediaList && Appio.reviewsMedia) {
                    const review =
                      Appio.reviewsMedia[
                        $(swiper.slides[swiper.activeIndex])
                          .find("img,video")
                          .attr("reviewId")
                      ];
                    if (review) {
                      $(".appio-review-for-media")
                        .html(
                          `<div class="appio-review-row"><div class="appio-review-item-name">${Appio.xssEscape(
                            review.customer
                          )}</div>${Appio.buildStarRating(
                            review.rating
                          )}<div class="appio-review-item-date">${Appio.xssEscape(
                            Appio.formatDate(review.createdAt)
                          )}</div></div><div class="appio-review-body-wrap">${
                            review.body
                          }</div>`
                        )
                        .show();
                    } else $(".appio-review-for-media").hide().html("");
                  }
                }, 100);
              },
              keyPress: (swiper, keyCode) => {
                switch (keyCode) {
                  case 38:
                    swiper.slidePrev();
                    break;
                  case 40:
                    swiper.slideNext();
                    break;
                  case 27:
                    Appio.stopAllVideo();
                    Appio.hideBackdropBox("#appio-img-box");
                    break;
                }
              },
            },
          });
        }
        Appio.log("Swiper loaded");
        Appio.swiperLoadedPending?.();
        callback?.();
      };

      if (typeof Swiper == "undefined") {
        Appio.loadCSSJS(
          "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
        );
        Appio.loadCSSJS(
          "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js",
          loadedSwiper
        );
      } else {
        const hasSwiperCss = !!getComputedStyle(
          document.querySelector(":root")
        )?.getPropertyValue("--swiper-theme-color");
        !hasSwiperCss &&
          Appio.loadCSSJS(
            "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
          );
        loadedSwiper();
      }
    },

    loadMoment: async (callback) => {
      if (Appio.momentLoaded) return;
      const loadedMoment = () => {
        Appio.momentLoaded = true;
        Appio.log("Moment loaded");
        Appio.formatDatePending?.();
        callback?.();
      };
      if (typeof moment == "undefined") {
        await Appio.loadCSSJS(
          "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js",
          loadedMoment
        );
      } else {
        loadedMoment();
      }
    },

    loadLazyLoad: async (callback) => {
      if (Appio.lazyLoadLoaded) return;
      const loadedLazyLoad = () => {
        Appio.lazyLoadLoaded = true;
        Appio.log("Lazy load loaded");
        Appio.lazyLoadedPending?.();
        callback?.();
      };
      if (typeof LazyLoad == "undefined") {
        await Appio.loadCSSJS(
          "https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.4/dist/lazyload.min.js",
          loadedLazyLoad
        );
      } else {
        loadedLazyLoad();
      }
    },

    init: async ({ action, data }) => {
      if (Appio.isReady && !Appio.isUIPreview) {
        return;
      }

      Appio.container = data?.parent
        ? document.querySelector(data.parent)
        : document.body;
      if (!Appio.container) return;

      Appio.setConfig(data?.config || window._appioConfig);
      Appio.subscriptionPlan =
        (
          data?.subscriptionPlan ||
          {
            "3.0": "Free",
            "3.1": "Essential",
            "3.2": "Premium",
            "3.3": "VIP",
          }[window._appioVersion ?? "3.0"]
        )?.split("/")[0] || "Free";
      Appio.isFreePlan = Appio.subscriptionPlan == "Free";
      Appio.isEssentialPlan = Appio.subscriptionPlan == "Essential";
      Appio.isPremiumPlan = Appio.subscriptionPlan == "Premium";
      Appio.isVIPPlan = Appio.subscriptionPlan == "VIP";
      Appio.limitReviews = Appio.config.limitReviews || 10000;
      Appio.limitPhoto = Appio.config.limitPhoto;
      const _check =
          !!window._appioCheck &&
          window._appioCheck / 3 + +new Date("2020-02-20"),
        newVIPPlan = _check > +new Date("2024-01-01"),
        newEssPlan = _check > +new Date("2024-05-20");
      !Appio.config.limitReviews &&
        newVIPPlan &&
        (Appio.limitReviews = Appio.isVIPPlan
          ? 10000
          : Appio.isPremiumPlan
          ? 500
          : 20);
      if (newEssPlan) {
        !Appio.config.limitPhoto &&
          (Appio.limitPhoto = Appio.isVIPPlan
            ? 50
            : Appio.isPremiumPlan
            ? 10
            : Appio.isEssentialPlan
            ? 3
            : 1);
        if (Appio.isFreePlan) {
          Appio.limitReviews = 10;
          Appio.config.language = "English";
          Appio.config.widgetLayout = "list";
          Appio.config.showReviewerCountry = false;
          Appio.config.showVerifiedBadge = false;
          Appio.config.showReply = false;
          Appio.config.pageSize > 10 && (Appio.config.pageSize = 10);
        }
      }
      Appio.pageType =
        data?.pageType ||
        window._appioPage ||
        window.ShopifyAnalytics?.meta?.page?.pageType;
      Appio.pageType == "index" &&
        location.href.includes("/products/") &&
        (Appio.pageType = "product");
      Appio.isHomePage = Appio.pageType == "index";
      Appio.isProductPage = Appio.pageType == "product";
      Appio.isCollectionPage = Appio.pageType == "collection";
      Appio.isSearchPage = Appio.pageType == "search";
      Appio.isCustomPage = Appio.pageType == "page";
      Appio.isOtherPage =
        !Appio.isHomePage &&
        !Appio.isProductPage &&
        !Appio.isCollectionPage &&
        !Appio.isSearchPage;

      Appio.data = data?.data || window._appioData;
      Appio.forceMobile = data?.isMobile;
      Appio.showLogo =
        Appio.isFreePlan &&
        !Appio.config.allowedOptions?.includes("removeLogo");

      Appio.productRating = data?.summary || window._appioRating || {};
      Appio.ratings = window._appioRatings;
      Appio.productRating.realTotal =
        Appio.productRating.realTotal ?? Appio.productRating.total;
      Appio.isFeaturedWidget =
        window._appioFeaturedReviews ||
        (data?.isFeaturedWidget && data?.reviews);
      if (Appio.isFeaturedWidget) {
        if (window._appioFeaturedReviews) {
          Appio.featuredReviews = (window._appioFeaturedReviews.reviews ?? [])
            .map((_) => {
              const order = Number(/\(\(([^)]+)\)/.exec(_.title)?.[1]); //((123))
              _.order = isNaN(order) ? 0 : order;
              _.isPinned = _.isPinned ?? 0;
              return _;
            })
            .sort((a, b) => b.isPinned - a.isPinned || a.order - b.order);
          Appio.reviewsTotal = window._appioFeaturedReviews?.total;
        } else {
          Appio.featuredReviews = data?.reviews;
          Appio.reviewsTotal = data?.reviews?.length;
        }
        const limitFeaturedReviews =
          Appio.config.limitFeaturedReviews ??
          (Appio.isVIPPlan ? 100 : Appio.isPremiumPlan ? 5 : 2);
        limitFeaturedReviews < Appio.featuredReviews.length &&
          (Appio.featuredReviews = Appio.featuredReviews.slice(
            0,
            limitFeaturedReviews
          ));

        Appio.config.pageSize = Appio.config.featuredPageSize ?? 10;
        Appio.config.maxLines = Appio.config.featuredMaxLines ?? 18;
        Appio.config.widgetLayout = Appio.config.featuredLayout ?? "roll";
        Appio.config.textWidgetTitle = Appio.config.textFeaturedTitle;
        Appio.config.showWidgetTitle =
          !!Appio.config.textWidgetTitle.trim()?.length;
        Appio.productRating.total = Appio.featuredReviews.length ?? 0;
        Appio.config.showHeader = Appio.productRating.total > 0;
        Appio.config.showBody = true;
        Appio.config.showReviewFilters = "";
        Appio.config.showReply = Appio.config.featuredShowReply ?? false;
        Appio.config.showLikeReview = Appio.config.featuredShowLike ?? false;
        Appio.config.paginationType =
          Appio.config.featuredPaginationType ??
          (Appio.config.featuredShowPagination
            ? Appio.config.paginationType
            : "none");
        Appio.reviews = Appio.featuredReviews;
      } else {
        Appio.reviews = (data?.reviews || window._appioReviews) ?? [];
      }
      Appio.reviews = Appio.reviews?.slice(0, Appio.config.pageSize);

      setTimeout(() => {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document
          .querySelector(":root")
          .style.setProperty("--appio-scrollbar-width", `${scrollbarWidth}px`);
      });

      await Appio.loadJQuery();
      Appio.loadMoment();
      Appio.loadSwiper();
      Appio.loadLazyLoad();
      Appio.checkAppioReady(action);
    },

    checkWidgetMargin: () => {
      //add padding if needed
      if (Appio.widgetElement) {
        const computedStyle = getComputedStyle(Appio.widgetElement);
        const widgetWidth =
            Appio.widgetElement.clientWidth -
            parseFloat(computedStyle.paddingLeft) -
            parseFloat(computedStyle.paddingRight),
          containerWidth = document.documentElement.clientWidth;
        if ((containerWidth - widgetWidth) / containerWidth < 0.077) {
          const padding = Math.round(containerWidth * 0.0385);
          $(Appio.widgetElement).css({
            "padding-left": padding,
            "padding-right": padding,
          });
        }
      }
    },

    observeResizing: () => {
      const target = Appio.widgetElement; //Appio.container
      if (!Appio.resizingObserver) {
        let last = target?.getBoundingClientRect();
        Appio.resizingObserver = new ResizeObserver(() => {
          const rect = target.getBoundingClientRect();
          if (rect.width !== last?.width) {
            if (Appio.resizedAction) clearTimeout(Appio.resizedAction);
            Appio.resizedAction = setTimeout(
              () => {
                Appio.checkSizeChange(true);
                Appio.checkWidgetMargin();
                Appio.buildGrid();
                Appio.buildGrid(true); //for sidebar reviews
              },
              Appio.isUIPreview ? 0 : 500
            );
          }
          last = rect;
        });
      }
      if (target && Appio.resizingObject != target) {
        Appio.resizingObserver.observe(target);
        Appio.resizingObject &&
          Appio.resizingObserver.unobserve(Appio.resizingObject);
        Appio.resizingObject = target;
      }
    },

    buildSidebar: () => {
      if (!Appio.renderSidebar) {
        if (
          (Appio.config.showSideBarHomePage && Appio.isHomePage) ||
          (Appio.config.showSideBarCollectionPage && Appio.isCollectionPage) ||
          (Appio.config.showSideBarProductPage && Appio.isProductPage) ||
          (Appio.config.showSideBarOthersPage && Appio.isOtherPage)
        ) {
          let $sidebar = $(".appio-sidebar");
          if (!$sidebar.length) {
            $sidebar = $(
              `<div class="appio-sidebar"><div class="appio-sidebar-content" style="color:${
                Appio.config.sidebarCaptionColor || "#ffffff"
              };background-color:${
                Appio.config.sidebarBackground || Appio.config.colorStar
              }" appio-text>${Appio.config.textSidebar}</div></div>`
            );
            $(Appio.container).append($sidebar);
          }
          $sidebar.click(() => {
            Appio.config.sidebarLinkAllReviews &&
            (Appio.isVIPPlan ||
              Appio.config.allowedOptions?.includes("sidebarLinkAllReviews"))
              ? (location.href = "/pages/appio-reviews")
              : Appio.showAllReviews();
          });
          Appio.log("Sidebar render done");
        }
        Appio.renderSidebar = true;
        Appio.log("Sidebar checking done");
      }
    },

    findMajorTitleElement: () => {
      let ret;
      if (Appio.data.productName) {
        let maxSize = 0;
        $("p,span,div,h0,h1,h2,h3,h4,h5,i,b,u,a")
          .filter(function () {
            return (
              $(this).find(":first").length == 0 &&
              $(this).text().trim() == Appio.data.productName &&
              $(this).is(":visible") &&
              $(this).height() > 15
            );
          })
          .each(function (index) {
            if (index < 3) {
              //const size = $(this).width() * $(this).height();
              const size = parseFloat(window.getComputedStyle(this).fontSize);
              if (size > maxSize) {
                maxSize = size;
                ret = this;
              }
            }
          });
      }
      return ret;
    },

    buildRatingMajor: () => {
      if (!Appio.renderRatingMajor) {
        if (Appio.isProductPage && Appio.config.badgeOnProductPage) {
          let badge = $(".appio-rating-major");
          if (!badge.length && Appio.autoWidgets) {
            const snippet = `<div class="appio-rating-badge appio-rating-major">`;
            if (Appio.config.xpathMajorRating)
              badge = Appio.insertElement(
                [Appio.config.xpathMajorRating],
                $(snippet)
              );
            if (!badge?.length)
              badge = Appio.insertElement(
                Appio.ratingMajorRefSearch,
                $(snippet)
              );
            if (!badge?.length) {
              Appio.productTitleElement = Appio.findMajorTitleElement();
              if (Appio.productTitleElement) {
                badge = $(snippet);
                $(Appio.productTitleElement).after(badge);
              }
            }
          }
          badge?.length &&
            badge.data({
              rating: Appio.productRating?.average ?? 0,
              raters: Appio.productRating?.total ?? 0,
            }) &&
            Appio.showRatingBadges(badge);
          $(".appio-rating-major .appio-rating-content").click(async (_) => {
            if (Appio.config.xpathReviewTabButton) {
              $(Appio.config.xpathReviewTabButton)[0]?.click();
              await Appio.delay(200);
            }
            Appio.widgetElement?.scrollIntoView({ behavior: "smooth" });
          });
          Appio.renderRatingMajor = true;
          Appio.log("RatingMajor checking done");
        }
      }
    },

    checkBranding: async () => {
      if (Appio.isFreePlan) {
        const isInvisible = (selector) => {
          const ele = $(selector)[0];
          if (!ele) return false;
          const style = getComputedStyle(ele);
          return (
            style.display == "none" ||
            style.opacity == 0 ||
            style.visibility != "visible" ||
            !$(ele).is(":visible") ||
            $(ele).width() < 10 ||
            $(ele).height() < 10
          );
        };
        setInterval(() => {
          if (
            !Appio.config.textCustomizeCSS?.includes(".appio-powered-by") &&
            !Appio.config.allowedOptions?.includes("removeLogo") &&
            (isInvisible(".appio-powered-by img") ||
              isInvisible(".appio-powered-by") ||
              isInvisible(".appio-title-row") ||
              isInvisible(".appio-header-container")) &&
            !isInvisible(".appio-reviews-widget")
          )
            $(".appio-reviews-widget").remove();
        }, 5000);
      }
    },

    isRatingAfterLink: () => {
      return (
        !!Appio.config.ratingAfterLink ||
        [137826795734].includes(window.Shopify?.theme?.id)
      );
    },

    isMatchingProductTitleStartsWith: () => {
      // because some store config to show product title with the variant name at the end so the exactly matching fail
      return (
        Appio.config.findProductTitleStartsWith ||
        [161747501360].includes(window.Shopify?.theme?.id)
      );
    },

    getProductIds: async () => {
      // wait for ShopifyAnalytics available
      return;
      let i = 0;
      while (i++ < 10) {
        if (window.ShopifyAnalytics) break;
        await Appio.delay(1000);
      }
      return window.ShopifyAnalytics?.meta?.products?.map((_) => "" + _.id);
    },

    processRatings: (ratings, anchors) => {
      const handles = Object.keys(ratings || []);
      if (!handles.length) return;
      let titleElements, ratingTarget;
      if (Appio.config.xpathCollectionRating) {
        // find title elements using xpathCollectionRating
        const xss = Appio.config.xpathCollectionRating.split(">>"),
          xs = xss[0].split("|"),
          selector = xs[0],
          directive = (xs[1] ?? "").split(",");
        ratingTarget = xss[1];
        $(selector).each((_, el) => {
          const innerText = $(el).text().trim();
          titleElements == undefined &&
            (titleElements = {
              directive,
              isStartsWith: directive.includes("startwith"),
              isParent: directive.includes("parent"),
              isSearchHandle: directive.includes("handle"),
              items: {},
              get: (title, handle) => {
                let el = titleElements.isStartWith
                  ? titleElements.items[
                      Object.keys(titleElements.items).find((_) =>
                        _.startsWith(title)
                      )
                    ]
                  : titleElements.items[title];
                if (el && titleElements.isParent) {
                  titleElements.directive.map(
                    (_) =>
                      _ == "parent" &&
                      (Array.isArray(el)
                        ? el.forEach((_, i) => {
                            el[i] = el[i]?.parentElement;
                          })
                        : (el = el?.parentElement))
                  );
                }
                if (handle && titleElements.isSearchHandle) {
                  const els = Array.isArray(el) ? el : [el];
                  el = els.filter((e) => {
                    let found = $(e)
                      .attr("href")
                      ?.split("?")?.[0]
                      ?.endsWith("/" + handle);
                    if (found) return found;
                    $(e)
                      .find("a")
                      .each(function () {
                        found = $(this)
                          .attr("href")
                          ?.split("?")?.[0]
                          ?.endsWith("/" + handle);
                        if (found) return false;
                      });
                    return !!found;
                  });
                }
                return el;
              },
            });
          if (!titleElements.items[innerText])
            titleElements.items[innerText] = el;
          else if (Array.isArray(titleElements.items[innerText]))
            titleElements.items[innerText].push(el);
          else
            titleElements.items[innerText] = [
              titleElements.items[innerText],
              el,
            ];
        });
      }
      const findTitleElement = (parent, title, handle) => {
        if (!title) return;
        let titleEle = titleElements?.get(title, handle);
        if (titleEle) return titleEle;
        if (!parent) return;
        Appio.isMatchingProductTitleStartsWith()
          ? $(parent)
              .find(`*:visible`)
              .each((_, el) => {
                titleEle == undefined &&
                  $(el).height() > 10 &&
                  $(el).text().trim().startsWith(title) &&
                  (titleEle = el);
              })
          : $(parent)
              .find(`*:visible:not(:has(*))`)
              .each((_, el) => {
                titleEle == undefined &&
                  $(el).height() > 10 &&
                  $(el).text().trim() == title &&
                  (titleEle = el);
              });
        return titleEle;
      };
      let processed = 0;
      handles.map((handle) => {
        (anchors[handle] ?? [null])?.map((anchor) => {
          const ele = Appio.isRatingAfterLink()
            ? anchor
            : ratings[handle]?.title &&
              (findTitleElement(anchor, ratings[handle].title, handle) ??
                findTitleElement(
                  anchor?.parentElement,
                  ratings[handle].title,
                  handle
                ));
          if (ele) {
            const els = Array.isArray(ele) ? ele : [ele];
            els.forEach((el) => {
              const { marginLeft, paddingLeft, fontSize } =
                window.getComputedStyle(el);
              const ratingWidget = $(
                `<div style="${
                  Appio.config.starSize
                    ? ""
                    : `--appio-star-size:calc(${fontSize}*1.1);`
                }margin-left: ${marginLeft}; padding-left: ${paddingLeft};" class="appio-rating-badge" data-rating="${(
                  (ratings[handle].groupAverage > 0 && Appio.isVIPPlan
                    ? ratings[handle].groupAverage
                    : ratings[handle].rating) + ""
                ).replace(",", ".")}" data-raters="${(
                  (ratings[handle].groupAverage > 0 && Appio.isVIPPlan
                    ? ratings[handle].groupTotal
                    : ratings[handle].raters) + ""
                )
                  .replace(".", "")
                  .replace(",", "")}">`
              );
              if (ratingTarget) {
                const directive = ratingTarget.split(",");
                let ref = $(el);
                directive.map((x) => {
                  x == "parent" && (ref = ref.parent());
                  x == "next" && (ref = ref.next());
                });
                directive.includes("end")
                  ? ref.append(ratingWidget)
                  : directive.includes("begin")
                  ? ref.prepend(ratingWidget)
                  : directive.includes("before")
                  ? ratingWidget.insertBefore(ref)
                  : directive.includes("replace")
                  ? (ratingWidget.insertAfter(ref), ref.remove())
                  : directive.includes("content")
                  ? (ref.children().remove(), ref.append(ratingWidget))
                  : ratingWidget.insertAfter(ref);
              } else ratingWidget.insertAfter(el);
              processed++;
            });
          }
        });
      });
      processed &&
        Appio.showRatingBadges() &&
        window.dispatchEvent(new Event("resize"));
    },

    checkRatings: async (useThemeRating) => {
      if (!Appio.config.badgeOnProductsList || Appio.isUIPreview) return;
      if (
        useThemeRating ||
        $("appio-rating-badge .appio-rating-badge[data-id]").length ||
        ($(".appio-rating-badge[data-id]").length &&
          Appio.config.useThemeRatingItem)
      ) {
        Appio.showRatingBadges(".appio-rating-badge[data-id]:not([rendered])");
        setTimeout(() => Appio.checkRatings(true), 1000);
      } else if (
        Appio.autoWidgets &&
        (!Appio.isOtherPage || Appio.config.showRatingCustomPage)
      ) {
        const anchors = {},
          availableRatings = {};
        let productIds = await Appio.getProductIds(),
          productHandles = [];
        $(
          Appio.config.xpathCollectionHandles ||
            'a[href*="/products/"]:not([rendered]):visible'
        ).each((index, element) => {
          $(element).attr("rendered", "");
          const handle = decodeURIComponent(
            $(element).attr("href")?.split("?")[0]?.split("/").at(-1) ?? ""
          );
          if (
            handle &&
            !decodeURIComponent(location.href).includes(`products/${handle}`)
          ) {
            productIds == undefined &&
              !productHandles.includes(handle) &&
              productHandles.push(handle);
            anchors[handle] === undefined && (anchors[handle] = []);
            anchors[handle].push(element);
          }
        });
        if (
          Appio.ratings &&
          Appio.useRatingsCache &&
          !Appio.config.disableRatingsCache &&
          !Appio.config.useImportSummary
        ) {
          let changed = false;
          productHandles?.forEach((handle, index) => {
            if (Appio.ratings[handle]) {
              availableRatings[handle] = Appio.ratings[handle];
              delete productHandles[index];
              changed = true;
            }
          });
          changed && (productHandles = productHandles.filter((_) => !!_));
          if (productIds?.length) {
            !Appio.productRatings &&
              ((Appio.productRatings = {}),
              Object.keys(Appio.ratings).map((handle) => {
                Appio.productRatings[Appio.ratings[handle].productId] = {
                  ...Appio.ratings[handle],
                  handle,
                };
              }));
            changed = false;
            productIds.forEach((productId, index) => {
              if (Appio.productRatings[productId]) {
                const handle = Appio.productRatings[productId].handle;
                availableRatings[handle] = Appio.ratings[handle];
                delete productIds[index];
                changed = true;
              }
            });
            changed && (productIds = productIds.filter((_) => !!_));
          }
          Appio.processRatings(availableRatings, anchors);
        }
        if (productIds?.length || productHandles?.length) {
          await Appio.doFetch({
            cached: true,
            url: `/apps/appio/review/get-products-ratings`,
            data: {
              productIds,
              productHandles,
              locale: Appio.locale,
              useImportSummary: !!Appio.config.useImportSummary,
              saveRatings:
                !!Appio.ratings &&
                !Appio.config.useImportSummary &&
                Object.keys(Appio.ratings || []).length < 200,
            },
            callback: (ratings) => Appio.processRatings(ratings, anchors), //Object.assign(availableRatings, ratings),
          });
        }
        if (!productIds) setTimeout(Appio.checkRatings, 1000);
      }
    },

    formHtml:
      () => `<div class="appio-review-cover appio-backdrop" style="z-index:${
        Appio.maxZIndex - 2
      }">
    <div class="appio-review-box">
      <div class="appio-review-box-header"><div class="appio-review-box-title appio-widget-title">${
        Appio.config.textReviewButton
      }</div>
        <i class="appio-close-button"></i>
      </div>
      <div class="appio-review-form">
        <div class="appio-review-rating-box">
          <span style="display:none">${Appio.config.textReviewRating}</span>
          <div id="appio-review-rating">
            <input type="radio" id="appio-star5" name="appio-review-input-rating" value="5"/>
            <label for="appio-star5"></label>
            <input type="radio" id="appio-star4" name="appio-review-input-rating" value="4" />
            <label for="appio-star4"></label>
            <input type="radio" id="appio-star3" name="appio-review-input-rating" value="3" />
            <label for="appio-star3"></label>
            <input type="radio" id="appio-star2" name="appio-review-input-rating" value="2" />
            <label for="appio-star2"></label>
            <input type="radio" id="appio-star1" name="appio-review-input-rating" value="1" />
            <label for="appio-star1"></label>
          </div>
          <span class="appio-review-rating-notify"></span>
        </div>
        <input autocomplete="off" id="appio-review-input-title" type="text" placeholder="${
          Appio.config.textReviewTitle
        }">
        <textarea id="appio-review-input-body" type="text" placeholder="${
          Appio.config.textReviewContent
        }"></textarea>
        <div class="appio-reviewer-wrapper">
          <div><input autocomplete="off" id="appio-review-input-name" type="text" placeholder="${
            Appio.config.textReviewerName
          }"></div>
          <div>&nbsp;</div>
          <div><input autocomplete="off" id="appio-review-input-email" type="text" placeholder="${
            Appio.config.textReviewerEmail
          }"></div>
        </div>
        <div class="appio-media-upload-box">
          <div class="appio-media-upload-button">
            <input type="file" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/ogg,video/webm" id="appio-media-upload-tmp" multiple style="display:none"/>
            <label for="appio-media-upload-tmp">
              <div>${Appio.config.textAddMedia}</div>
            </label>
          </div>
        </div>
        <button class="appio-button-submit-review">${
          Appio.config.textSubmitReview
        }</button>
      </div>
    </div>
    </div>`,

    widgetHtml: () => `<svg style="display: none">
    <defs>
      <symbol id="appio-icon-verified" viewBox="0 0 24 24">
        <path fill="currentColor" d="m9.5924 3.2003c-0.24352 0.20753-0.36529 0.31131-0.49534 0.39847-0.2981 0.1998-0.63289 0.33847-0.98496 0.40798-0.15359 0.03033-0.31307 0.04305-0.63202 0.0685-0.80138 0.06396-1.2021 0.09593-1.5364 0.21401-0.7732 0.2731-1.3814 0.88128-1.6545 1.6545-0.11808 0.33429-0.15005 0.73499-0.21401 1.5364-0.02545 0.31895-0.03817 0.47843-0.0685 0.63202-0.06951 0.35207-0.20818 0.68686-0.40798 0.98496-0.08716 0.13005-0.19093 0.25181-0.39847 0.49534-0.52144 0.6119-0.78217 0.9178-0.93505 1.2377-0.35363 0.7399-0.35363 1.5999 0 2.3398 0.15289 0.3199 0.41361 0.6258 0.93505 1.2377 0.20751 0.2435 0.31131 0.3653 0.39847 0.4953 0.1998 0.2981 0.33847 0.6329 0.40798 0.985 0.03033 0.1536 0.04305 0.3131 0.0685 0.632 0.06396 0.8014 0.09593 1.2021 0.21401 1.5364 0.2731 0.7732 0.88128 1.3814 1.6545 1.6545 0.33429 0.118 0.73499 0.15 1.5364 0.214 0.31895 0.0254 0.47843 0.0382 0.63202 0.0685 0.35207 0.0695 0.68686 0.2082 0.98496 0.408 0.13005 0.0871 0.25181 0.1909 0.49534 0.3984 0.6119 0.5215 0.9178 0.7822 1.2377 0.9351 0.7399 0.3536 1.5999 0.3536 2.3398 0 0.3199-0.1529 0.6258-0.4136 1.2377-0.9351 0.2435-0.2075 0.3653-0.3113 0.4953-0.3984 0.2981-0.1998 0.6329-0.3385 0.985-0.408 0.1536-0.0303 0.3131-0.0431 0.632-0.0685 0.8014-0.064 1.2021-0.096 1.5364-0.214 0.7732-0.2731 1.3814-0.8813 1.6545-1.6545 0.118-0.3343 0.15-0.735 0.214-1.5364 0.0254-0.3189 0.0382-0.4784 0.0685-0.632 0.0695-0.3521 0.2082-0.6869 0.408-0.985 0.0871-0.13 0.1909-0.2518 0.3984-0.4953 0.5215-0.6119 0.7822-0.9178 0.9351-1.2377 0.3536-0.7399 0.3536-1.5999 0-2.3398-0.1529-0.3199-0.4136-0.6258-0.9351-1.2377-0.2075-0.24353-0.3113-0.36529-0.3984-0.49534-0.1998-0.2981-0.3385-0.63289-0.408-0.98496-0.0303-0.15359-0.0431-0.31307-0.0685-0.63202-0.064-0.80138-0.096-1.2021-0.214-1.5364-0.2731-0.7732-0.8813-1.3814-1.6545-1.6545-0.3343-0.11808-0.735-0.15005-1.5364-0.21401-0.3189-0.02545-0.4784-0.03817-0.632-0.0685-0.3521-0.06951-0.6869-0.20818-0.985-0.40798-0.13-0.08716-0.2518-0.19093-0.4953-0.39847-0.6119-0.52144-0.9178-0.78216-1.2377-0.93505-0.7399-0.35363-1.5999-0.35363-2.3398 0-0.3199 0.15288-0.6258 0.41361-1.2377 0.93505zm6.7811 6.6629c0.3178-0.31784 0.3178-0.83314 0-1.151-0.3178-0.31783-0.8332-0.31783-1.151 0l-4.8502 4.8502-1.5948-1.5948c-0.31783-0.3178-0.83314-0.3178-1.151 0s-0.31783 0.8331 0 1.151l2.1703 2.1703c0.31782 0.3178 0.83312 0.3178 1.151 0l5.4257-5.4258z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"/>
      </symbol>
      <symbol id="appio-icon-video" viewBox="0 0 122.88 111.34">
        <path d="M23.59,0h75.7a23.68,23.68,0,0,1,23.59,23.59V87.75A23.56,23.56,0,0,1,116,104.41l-.22.2a23.53,23.53,0,0,1-16.44,6.73H23.59a23.53,23.53,0,0,1-16.66-6.93l-.2-.22A23.46,23.46,0,0,1,0,87.75V23.59A23.66,23.66,0,0,1,23.59,0ZM54,47.73,79.25,65.36a3.79,3.79,0,0,1,.14,6.3L54.22,89.05a3.75,3.75,0,0,1-2.4.87A3.79,3.79,0,0,1,48,86.13V50.82h0A3.77,3.77,0,0,1,54,47.73ZM7.35,26.47h14L30.41,7.35H23.59A16.29,16.29,0,0,0,7.35,23.59v2.88ZM37.05,7.35,28,26.47H53.36L62.43,7.38v0Zm32,0L59.92,26.47h24.7L93.7,7.35Zm31.32,0L91.26,26.47h24.27V23.59a16.32,16.32,0,0,0-15.2-16.21Zm15.2,26.68H7.35V87.75A16.21,16.21,0,0,0,12,99.05l.17.16A16.19,16.19,0,0,0,23.59,104h75.7a16.21,16.21,0,0,0,11.3-4.6l.16-.18a16.17,16.17,0,0,0,4.78-11.46V34.06Z"/>
      </symbol>
    </defs>
    </svg>
    <div class="appio-header-container"></div>
    <div class="appio-reviews-section appio-body" ${Appio.config.widgetLayout}>
      <div class="appio-reviews-box"></div>
      <div class="appio-paging-box"></div>
    </div>`,

    widgetRefSearch: [
      //format: (<theme_store_id/theme_id/**theme_name**>)<selector>|<directive:after,before,begin,end,replace>
      //---- custome themes --------
      "(124074918066)main|end",
      "(160084820270)section:last|before",
      "(158522376487)section.relateproduct|before", //theme 'Fashe'
      "(158653874462).main.content", //theme 'Turbo theme'
      "(154260570452)#shopify-section-footer|before",
      //-----------------------------
      "#shopify-product-reviews|replace", // add to review tab
      "#review.tab-pane|content",
      "#shopify-section-product-recommendations|before",
      ".product.main-section",
      ".product-single",
      ".tab-pd-details",
      ".product-description",
      ".related-products|before",
      "main|end", //at the end of main
    ],

    ratingBadgeRefSearch: [
      //format: (<theme_store_id>)<selector>|<directive>
      ".price|begin,parent", //before .price class
      ".product-price|begin,parent",
    ],

    ratingMajorRefSearch: [
      //format: (<theme_store_id>)<selector>|<directive>\
      // specific theme ----------------------------
      ".price-review .spr-badge|replace", //theme 'good life', id: 157341810992
      //--------------------------------------------
      ".product__title",
      ".product_title",
      ".product-title",
      ".product__section-title|end",
      //".title|end",
      //"h1.title", //theme Providence
      "div[class$='--title'],div[class*='--title ']|end",
      ".product-single__title",
      ".productView-title",
      //--------------------------------------------
      '.grid-item>h1.h2[itemprop="name"]',
      '.grid__item>h1.h2[itemprop="name"]',
      //--------------------------------------------
      ".product__title .product__title--template",
      ".ProductMeta__Title",
      ".tt-product-single-info .tt-title",
      ".product-block-list__item .product-meta__title",
      ".gt_atom-cZGCOCvfkBpcRgQ_productTitle",
      ".pr_title",
      ".prd-block_title",
      ".productInfo h1",
      ".product_name",
      ".product-description-header",
      ".layout-column-half-right>.title",
      ".product-page-info__title>h1",
      "h1.gt_heading",
      "#popup_cart_title",
      ".apb_product_detail_information_title",
      ".product-area__details__title",
      ".product-info>h3.title30",
      ".gt_product-content>h2",
      ".product-detail__title",
      ".prod__title",
      ".product-meta>.product-meta__title",
      ".productInfo>h2",
      ".product-name",
      ".product__section-title>h1",
      //--------------------------------------------
      ".page-header h1.title",
      ".title-detail",
      ".title>h1",
      ".title-row>h1.title",
      "h2.product-page--heading",
      ".section-header__title.product-titre",
      ".block.type-title",
      "h2.product-details-product-title",
      "h1.product-info__title",
      ".product-detail-part>h2[itemprop='name']",
      "h2.single_product__title",
      "#product-description h1.h2",
      "h1.product-item-caption-title.-product-page",
      "h1.product-title",
      "h2[data-attribute='productTitle']",
      //--------------------------------------------
      "h1.product__section-title",
      "h1.product-single__title-text",
      'h1[itemprop="name"]',
      ".proBoxInfo>h1",
      ".product-header",
      "h1.title-primary",
      "[data-product-description-container]>h2.h1",
      ".col-md-12>.title-sale",
      ".shg-product-title-component",
      ".t4s-product__title",
      ".bls__product-title",
      //--------------------------------------------
      ".product-price|begin,parent",
      ".product__price|begin,parent", //theme Motion
    ],

    selectorReviewTabButton: ['li a[href="#review"]'].join(","),

    insertElement: (searches, elementHtml, all) => {
      let ret;
      for (let i = 0; i < searches.length; i++) {
        const tmps = searches[i].split("|"),
          directive = ((tmps.length > 1 && tmps[1]) || "after").split(",");
        let ref = tmps[0];
        const matches = ref.match(/\(([^)]+)\)/); //find themeInfo between (...)
        if (matches?.length == 2) {
          const theme = window.Shopify.theme,
            themeInfo = matches[1].trim(),
            themeInfoClean = themeInfo.replaceAll("**", "");
          if (
            themeInfo &&
            !(
              theme?.theme_store_id == themeInfo ||
              theme?.id == themeInfo ||
              (isNaN(themeInfo) &&
                (theme?.name == themeInfo ||
                  (themeInfo.startsWith("**") &&
                    themeInfo.endsWith("**") &&
                    theme?.name.includes(themeInfoClean)) ||
                  (themeInfo.startsWith("**") &&
                    theme?.name.endsWith(themeInfoClean)) ||
                  (themeInfo.endsWith("**") &&
                    theme?.name.startsWith(themeInfoClean))))
            )
          )
            continue;
          ref = ref.replace(matches[0], "");
        }
        //!ref.includes(":visible") && (ref += ":visible");
        let refElement = $(ref);
        refElement.length > 1 &&
          (refElement = $(ref).filter(function () {
            return (
              $(this).is(":visible") &&
              $(this).width() > 100 &&
              $(this).height() > 10
            );
          }));
        if (refElement.length == 1) {
          directive.map((x) => {
            x == "parent" && (refElement = refElement.parent());
          });
          if (refElement.length == 1 && !refElement.attr("appio-ref")) {
            refElement.attr("appio-ref", 1);
            ret = $(elementHtml);
            if (directive.includes("end")) {
              refElement.append(ret);
            } else if (directive.includes("begin")) {
              refElement.prepend(ret);
            } else if (directive.includes("before")) {
              ret.insertBefore(refElement);
            } else if (directive.includes("replace")) {
              ret.insertAfter(refElement);
              refElement.remove();
            } else if (directive.includes("content")) {
              refElement.children().remove();
              refElement.append(ret);
            } else {
              ret.insertAfter(refElement);
            }
          }
          if (!all) break;
        }
      }
      return ret;
    },

    buildReviewsWidget: (parent) => {
      if (!Appio.isUIPreview && Appio.renderWidget) return;
      let widget = $(".appio-reviews-widget").first();
      if (Appio.config.showBody || Appio.config.showHeader) {
        if (
          !widget.length &&
          (Appio.isFeaturedWidget || Appio.isProductPage) &&
          (parent || Appio.autoWidgets)
        ) {
          widget = $('<div class="appio-reviews-widget">');
          if (parent) $(parent).append(widget);
          else if (Appio.autoWidgets) {
            let selectors = Appio.widgetRefSearch;
            if (Appio.isProductPage) {
              Appio.config.xpathReviewWidget &&
                (selectors = Appio.config.xpathReviewWidget.split(";"));
            } else if (Appio.isFeaturedWidget) {
              Appio.config.xpathFeaturedReviews &&
                (selectors = Appio.config.xpathFeaturedReviews.split(";"));
            }
            widget = Appio.insertElement(selectors, widget);
          }
        }
        if (
          widget?.length &&
          (!Appio.isFeaturedWidget || Appio.featuredReviews?.length)
        ) {
          Appio.widgetElement = widget[0];
          /*$('#element').is(':empty') && */ widget.html(Appio.widgetHtml());
          if (Appio.isProductPage) {
            if (Appio.isUIPreview) $(".appio-review-cover").remove();
          }
          Appio.buildProductReviews();
          Appio.log("Review widget render done");
        } else widget?.remove();
      } else if (!window.Shopify?.designMode) widget?.html("");
      if (widget?.length) {
        const attr = {
          filters: Appio.config.showReviewFilters || "none",
          layout: Appio.config.widgetLayout,
        };
        Appio.isMobile && (attr.mobile = "");
        if (Appio.isUIPreview) widget.removeAttr(Object.keys(attr).join(" "));
        widget.attr(attr);
        Appio.checkWidgetMargin();
      }
      Appio.renderWidget = true;
      Appio.log("Review widget checking done");
    },

    insertSnippets: () => {
      if (window._appioRichSnippets) {
        Appio.log("Begin insertSnippets");
        const nodeList = document.querySelectorAll("script");
        for (let i = 0; i < nodeList.length; i++) {
          const scriptTag = nodeList[i];
          if (scriptTag.type == "application/ld+json") {
            try {
              const tmp = JSON.parse(scriptTag.innerHTML || "{}");
              if (tmp["@type"] == "Product") {
                tmp.aggregateRating = window._appioRichSnippets.aggregateRating;
                scriptTag.innerHTML = JSON.stringify(tmp);
                delete window._appioRichSnippets;
                return;
              }
            } catch {}
          }
        }
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify(window._appioRichSnippets);
        document.head.appendChild(script);
        delete window._appioRichSnippets;
      }
    },

    contrast: (t, r) => {
      if (!(t?.length >= 6 && r?.length >= 6)) return 10;
      let $ = (t, r, $) => {
          var n = [t, r, $].map((t) =>
            (t /= 255) <= 0.03928
              ? t / 12.92
              : Math.pow((t + 0.055) / 1.055, 2.4)
          );
          return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
        },
        n = (t) => {
          if (Array.isArray(t) && 3 == t.length) return t;
          if (
            (t.startsWith("#") && (t = t.substring(1)),
            3 == t.length &&
              (t = t
                .split("")
                .map((t) => t + "" + t)
                .join("")),
            6 != t.length)
          )
            t = t.substring(0, 6); //throw "Only six-digit hex ms are allowed.";
          var r,
            $ = t.match(/.{1,2}/g);
          return [parseInt($[0], 16), parseInt($[1], 16), parseInt($[2], 16)];
        };
      var a,
        e,
        i = $(...n(t)),
        _ = $(...n(r));
      return (Math.max(i, _) + 0.05) / (Math.min(i, _) + 0.05);
    },

    shadeColor: (color, percent) => {
      var R = parseInt(color.substring(1, 3), 16);
      var G = parseInt(color.substring(3, 5), 16);
      var B = parseInt(color.substring(5, 7), 16);
      R = parseInt((R * (100 + percent)) / 100);
      G = parseInt((G * (100 + percent)) / 100);
      B = parseInt((B * (100 + percent)) / 100);
      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;
      R = Math.round(R);
      G = Math.round(G);
      B = Math.round(B);
      var RR =
        R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
      var GG =
        G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
      var BB =
        B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);
      return "#" + RR + GG + BB;
    },
    lightenColor: (color) => Appio.shadeColor(color, 40),
    darkenColor: (color) => Appio.shadeColor(color, -40),

    start: async () => {
      if (window._isAppioStarting) return;
      window._isAppioStarting = true;
      Appio.log("Appio starting...");

      // check and wait 10 secs for _appioVersion is available to read
      // because some theme prevent script tags from initial but reactivate them later
      let i = 0;
      while (i++ < 10) {
        if (window._appioVersion) break;
        await Appio.delay(1000);
      }
      if (window._appioVersion === undefined) {
        Appio.log("Appio could not start (SubscriptionPlan not found)");
        return;
      }

      window.AppioOnMediaError = Appio.mediaError;
      Appio.insertSnippets();

      //check css loaded
      if (
        !getComputedStyle(document.querySelector(":root"))?.getPropertyValue(
          "--appio-styles"
        )
      ) {
        Appio.log("Load appio css");
        //find appio-reviews.js path
        const sts = document.getElementsByTagName("script");
        let css;
        for (var k in sts) {
          const i = sts[k].src?.indexOf("appio-reviews.");
          if (i > 0) {
            css = sts[k].src.substring(0, i) + "appio-reviews.css";
            break;
          }
        }
        css && (await Appio.loadCSSJS(css));
      }

      Appio.init({
        action: async () => {
          Appio.log("Appio init done");
          Appio.isBuilding = true;
          Appio.isAllReviewsPage =
            $(".appio-reviews-widget[extension]").length &&
            !Appio.data?.productId;
          if (Appio.isAllReviewsPage) {
            if (
              Appio.isVIPPlan ||
              Appio.config.allowedOptions?.includes("featuredLinkAllReviews") ||
              Appio.config.allowedOptions?.includes("sidebarLinkAllReviews")
            ) {
              $(".appio-reviews-widget[extension]").attr("all-reviews", "");
              Appio.config.pageSize = 15;
              Appio.config.widgetLayout = "list";
              Appio.config.textWidgetTitle = Appio.config.textFeaturedTitle;
              Appio.buildStyles();
              Appio.buildReviewsWidget();
              Appio.reviewsTotal = await Appio.loadProductReviews({
                page: 1,
                featured: Appio.isAllReviewsPage,
                requireCount: true,
              });
              Appio.reviewsTotal > 1 &&
                $(".appio-reviews-summary").html(
                  `<span class="appio-total-review" appio-text>${Appio.reviewsTotal} ${Appio.config.textReviews}</span>`
                );
            }
          } else {
            Appio.buildStyles();
            Appio.checkParams();
            if (!Appio.processedPreview) {
              Appio.buildReviewsWidget();
              Appio.pendingAction?.();
            }
            Appio.buildSidebar();
            Appio.buildRatingMajor();
            Appio.checkRatings();
            Appio.buildReviewsPopup();
            Appio.loadProductReviews({ cacheFistPage: true }); // cache the first page
          }
          Appio.checkBranding();
          Appio.translate();
          Appio.isBuilding = false;
        },
      });
    },

    setConfig: (config, isUpdate) => {
      // xss prevention
      config = JSON.parse(Appio.xssEscape(JSON.stringify(config || {})));
      const WIDGET_MARJOR_COLOR = Appio.WIDGET_MARJOR_COLOR;
      const WIDGET_CONFIG_DEFAULT = {
        language: "English",
        autoLanguage: true,
        autoTranslateReviews: false,
        customTexts: null, // {English:{}, Spain:{},...}
        widgetOnProductPage: true,
        badgeOnProductPage: true,
        badgeOnProductsList: true,

        showRatingProductDetails: false,
        showRatingProductList: false,
        ratingSameFormat: true,
        showSideBarHomePage: false,
        showSideBarCollectionPage: false,
        showSideBarProductPage: false,
        showSideBarOthersPage: false,
        ratingFormatProduct: "(#raters #reviews)",
        ratingFormatCollection: "(#raters)",

        keyWordSidebar1Star: "Excellent!",
        keyWordSidebar2Star: "Good!",
        keyWordSidebar3Star: "So so!",
        keyWordSidebar4Star: "",
        keyWordSidebar5Star: "",

        keyWordWidget1Star: "Excellent!",
        keyWordWidget2Star: "Good!",
        keyWordWidget3Star: "So so!",
        keyWordWidget4Star: "",
        keyWordWidget5Star: "",

        showSummary: true,
        showHeader: true,
        showBody: true,
        showMediaList: false,
        hideHeaderWhenNoReview: false,
        showReviewButton: true,
        showWidgetTitle: true,
        showAverageRating: true,
        showReviewFilters: "star", //star, button, solid, number, false
        paginationType: "numbers,center", //numbers, pages, prev-next, more, none
        colorStar: WIDGET_MARJOR_COLOR,
        colorAverage: "",
        colorBorderAverage: "",
        colorBorderReview: "",
        colorBorderButton: "",
        colorText: "",
        colorBackground: "",
        colorVerifiedBadge: "#1c96e9",
        colorReply: "",
        colorTitle: "",
        colorWidgetBackground: "",
        colorWidgetText: "",
        starSize: "",
        thumbSize: 80,
        maxLines: 18,
        cornerRadius: 10,
        pageSize: 10,
        widgetLayout: "list",
        defaultSortReviewBy: "featured",
        pinnedFirst: true,
        showReply: true,
        allowSortReview: true,
        layoutShape: "square",
        fontSize: 15,
        borderSize: 0,
        colorButtonText: "",
        colorButtonBackground: "",
        textCustomizeCSS: "",
        textReviewDateFormat: "MMM DD, YYYY",

        sidebarBackground: WIDGET_MARJOR_COLOR,
        sidebarCaptionColor: "#ffffff",
        sidebarDisplayType: "popup",
        sidebarLinkAllReviews: false,
        ratingBadgeHideEmpty: true,
        ratingBadgeBackground: "",
        ratingBadgeColor: "",
        ratingIcon: "gG",
        ratingDetailsPopup: true,
        ratingWords: "Excellent!;Good!;Fine;;",

        showReviewDate: true,
        showReviewTitle: true,
        showReviewContent: true,
        showReviewerCountry: true,
        showReviewerName: true,
        showVerifiedBadge: true,
        showPhotoVideo: true,
        showLikeReview: false,

        slideDelay: 10,
        xpathReviewWidget: "",
        xpathFeaturedReviews: "",
        xpathMajorRating: "",
        xpathCollectionRating: "",
        xpathCollectionHandles: "",
        xpathReviewTabButton: "",

        featuredShowReply: false,
        featuredShowLike: false,
        featuredLayout: "roll",
        featuredPaginationType: "numbers,center",
        featuredShowProduct: true,
        featuredShowReviewsCount: true,
        featuredLinkAllReviews: false,
        featuredPageSize: 10,
        featuredMaxLines: 18,
      };

      // backward compatible
      config.showReviewFilters === true &&
        (config.showReviewFilters =
          config.showFilterButtons === true
            ? "button"
            : WIDGET_CONFIG_DEFAULT.showReviewFilters);
      config.widgetLayout == "carousel" && (config.widgetLayout = "line");

      if (config.sidebarCaption != undefined) {
        config.textSidebar = config.textSidebar ?? config.sidebarCaption;
        delete config.sidebarCaption;
      }

      if (config.showPagination != undefined) {
        config.paginationType =
          config.paginationType ??
          (config.showPagination ? "pages,right" : "none");
        delete config.showPagination;
      }

      if (config.showSidebar != undefined) {
        config.showSideBarHomePage =
          config.showSideBarHomePage ?? config.showSidebar;
        config.showSideBarCollectionPage =
          config.showSideBarCollectionPage ?? config.showSidebar;
        config.showSideBarProductPage = config.showSideBarProductPage ?? false;
        config.showSideBarOthersPage =
          config.showSideBarOthersPage ?? config.showSidebar;
        delete config.showSidebar;
      }

      if (config.ratingBadgeNumberFormat != undefined) {
        config.ratingFormatProduct =
          config.ratingFormatProduct ?? config.ratingBadgeNumberFormat;
        config.ratingFormatCollection =
          config.ratingFormatCollection ?? config.ratingBadgeNumberFormat;
        delete config.ratingBadgeNumberFormat;
      }

      if (config.ratingBadgeShowNumber === false) {
        config.ratingFormatProduct = "";
        config.ratingFormatCollection = "";
        delete config.ratingBadgeShowNumber;
      }

      if (config.showCountry != undefined) {
        config.showReviewerCountry =
          config.showReviewerCountry ?? config.showCountry;
        delete config.showCountry;
      }

      // custom text language
      if (config.localeBySubDomain) {
        Appio.locale = ((hs) => hs.length == 3 && hs[0] != "www" && hs[0])(
          location.host.split(".")
        );
      }
      !Appio.locale && (Appio.locale = window["Shopify"]?.locale || "en");

      let lang = Appio.isUIPreview
        ? config.language
        : config.autoLanguage ?? WIDGET_CONFIG_DEFAULT.autoLanguage
        ? Appio.lang.codes[Appio.locale?.split("-")[0]]
        : config.language;
      if (!lang) {
        lang = WIDGET_CONFIG_DEFAULT.language;
        Appio.translateTexts = true;
      }
      const langTexts =
          Appio.lang[lang == "custom" ? WIDGET_CONFIG_DEFAULT.language : lang],
        customTexts = config.customTexts?.[lang];

      // merge config with default
      Appio.config = {
        ...WIDGET_CONFIG_DEFAULT,
        ...langTexts,
        ...customTexts,
        ...(isUpdate && Appio.config),
        ...config,
      };

      //remap rating letters
      Appio.config.ratingIcon =
        {
          aA: "\xa1\xa2",
          gG: "\xa3\xa4",
          hH: "\xa5\xa6",
          iI: "\xa7\xa8",
          jJ: "\xa9\xaa",
          kK: "\xab\xac",
          lL: "\xad\xae",
          mM: "\xaf\xb0",
          nN: "\xb1\xb2",
          oO: "\xb3\xb4",
        }[Appio.config.ratingIcon] ?? Appio.config.ratingIcon;
      Appio.config.autoTranslateReviews &&
        Appio.locale != "en" &&
        Appio.config.textReviewDateFormat.includes("MMM") &&
        (Appio.config.textReviewDateFormat = "MM/DD/YYYY");
      !Appio.config.starSize && (Appio.config.starSize = 18);
      !Appio.config.colorButtonBackground &&
        (Appio.config.colorButtonBackground = Appio.config.colorStar);
      !Appio.config.xpathReviewTabButton &&
        (Appio.config.xpathReviewTabButton = Appio.selectorReviewTabButton);
      Appio.config.borderSize = isNaN(Appio.config.borderSize)
        ? 0
        : Number(Appio.config.borderSize);
      const words = Appio.config.ratingWords?.split(";");
      Appio.ratingWords = {
        5: words?.[0] ?? "",
        4: words?.[1] ?? "",
        3: words?.[2] ?? "",
        2: words?.[3] ?? "",
        1: words?.[4] ?? "",
      };
    },
    lang: {
      codes: {
        "en": "English",
        "fr": "French",
        "es": "Spanish",
        "pt": "Portuguese",
        "nl": "Dutch",
        "it": "Italian",
        "de": "Germany",
        "pl": "Polish",
        "ru": "Russian",
        "sv": "Swedish",
      },
      English: {
        textWidgetTitle: "Customer Reviews",
        textSidebar: "Customer Reviews",
        textFeaturedReviews: "Featured Reviews",
        textFeaturedTitle: "What our customers think",
        textReviewButton: "Write a review",
        textReviewButtonNone: "Be the first to write a review",
        textShopReply: "Replied",
        textReviewSummary: "Based on #raters #reviews",
        textReviewerName: "Your Name",
        textReviewerEmail: "Your Email",
        textReviewRating: "Your Rating",
        textReviewTitle: "Title",
        textReviewContent: "Content",
        textSubmitReview: "Submit review",
        textSendingReview: "Review sending...",
        textReviewSuccess: "Thank you for the review!",
        textReviewFailed: "Oops! Something went wrong!",
        textUploadMediaFailed: "Could not upload photo/video.",
        textRating: "Please give us your rating",
        textRating1: "You have rated 1 star",
        textRating2: "You have rated 2 stars",
        textRating3: "You have rated 3 stars",
        textRating4: "You have rated 4 stars",
        textRating5: "You have rated 5 stars",
        textValidationName: "Please input your name",
        textValidationEmail: "Please input a valid email address",
        textValidationContent: "Please input review content",
        textValidationLimitFiles: "Allow maximum ## files upload",
        textValidationLimitVideo: "Allow only one video upload",
        textAddMedia: "Add photo / video",
        textSortBy: "Sort by",
        textSortByFeatured: "Featured",
        textSortByTime: "Most recent",
        textSortByHigh: "Highest rating",
        textSortByLow: "Lowest rating",
        textSortByPhoto: "Photo first",
        textLikeReview: "Helpful?",
        textLikeReview1: "Like",
        textLikeReview2: "Vote",
        textVerified: "Verified",
        textVerified1: "Purchased",
        textVerified2: "Purchase verified",
        textReview: "review",
        textReviews: "reviews",
        textSeeReviews: "See customer reviews",
        textShowMore: "See more reviews",
        textShowAll: "Show all",
        textPrevPage: "Previous page",
        textNextPage: "Next page",
        textReadMore: "Read more",
        textAll: "All",
        textPhotoVideo: "Photo/video",
        textPositive: "Positive",
        textNegative: "Negative",
      },
      French: {
        textWidgetTitle: "Avis des clients",
        textSidebar: "Avis des clients",
        textFeaturedReviews: "Avis en vedette",
        textFeaturedTitle: "Ce que les gens disent",
        textReviewButton: "Écrire un avis",
        textReviewButtonNone: "Soyez le premier à rédiger un avis",
        textShopReply: "A répondu",
        textReviewSummary: "Basé sur #raters #reviews",
        textReviewerName: "Votre nom",
        textReviewerEmail: "Votre e-mail",
        textReviewRating: "Votre note",
        textReviewTitle: "Titre",
        textReviewContent: "Contenu",
        textSubmitReview: "Poster le avis",
        textSendingReview: "Envoi d'avis...",
        textReviewSuccess: "Merci pour la critique!",
        textReviewFailed: "Oops! Quelque chose s'est mal passé!",
        textUploadMediaFailed: "Impossible de télécharger la photo/vidéo.",
        textRating: "Merci de nous donner votre note",
        textRating1: "Vous avez noté 1 étoile",
        textRating2: "Vous avez noté 2 étoiles",
        textRating3: "Vous avez noté 3 étoiles",
        textRating4: "Vous avez noté 4 étoiles",
        textRating5: "Vous avez noté 5 étoiles",
        textValidationName: "Veuillez saisir votre nom",
        textValidationEmail: "Veuillez saisir une adresse e-mail valide",
        textValidationContent: "Veuillez saisir le contenu de l'avis",
        textValidationLimitFiles:
          "Autoriser le téléchargement d'un maximum de ## fichiers",
        textValidationLimitVideo: "Autoriser un seul téléchargement de vidéo",
        textAddMedia: "Ajouter une photo/vidéo",
        textSortBy: "Trier par",
        textSortByFeatured: "En vedette",
        textSortByTime: "Le plus récent",
        textSortByHigh: "Note la plus élevée",
        textSortByLow: "Note la plus basse",
        textSortByPhoto: "Photo d'abord",
        textLikeReview: "Utile?",
        textLikeReview1: "Comme",
        textLikeReview2: "Vote",
        textVerified: "Vérifié",
        textVerified1: "Acheté",
        textVerified2: "Achat vérifié",
        textReview: "avis",
        textReviews: "avis",
        textSeeReviews: "Voir les avis clients",
        textShowMore: "Voir plus d'avis",
        textShowAll: "Afficher tout",
        textPrevPage: "Page précédente",
        textNextPage: "Page suivante",
        textReadMore: "En savoir plus",
        textAll: "Tous",
        textPhotoVideo: "Photo/vidéo",
        textPositive: "Positif",
        textNegative: "Négatif",
      },
      Spanish: {
        textWidgetTitle: "Reseñas de clientes",
        textSidebar: "Reseñas de clientes",
        textFeaturedReviews: "Reseñas destacadas",
        textFeaturedTitle: "Lo que la gente está diciendo",
        textReviewButton: "Escribir una reseña",
        textReviewButtonNone: "Sé el primero en escribir una reseña",
        textShopReply: "Respondió",
        textReviewSummary: "Basado en #raters #reviews",
        textReviewerName: "Su nombre",
        textReviewerEmail: "Tu correo electrónico",
        textReviewRating: "Su calificación",
        textReviewTitle: "Título",
        textReviewContent: "Contenido",
        textSubmitReview: "Enviar reseña",
        textSendingReview: "Reseña enviando...",
        textReviewSuccess: "¡Gracias por la reseña!",
        textReviewFailed: "¡Ups! ¡Algo salió mal!",
        textUploadMediaFailed: "No se pudo cargar la foto/vídeo.",
        textRating: "Por favor danos tu calificación",
        textRating1: "Has valorado 1 estrella",
        textRating2: "Has valorado 2 estrellas",
        textRating3: "Has puntuado con 3 estrellas",
        textRating4: "Has puntuado con 4 estrellas",
        textRating5: "Has puntuado con 5 estrellas",
        textValidationName: "Por favor ingresa tu nombre",
        textValidationEmail:
          "Por favor ingrese una dirección de correo electrónico válida",
        textValidationContent: "Por favor ingrese el contenido de la reseña",
        textValidationLimitFiles: "Permitir la carga máxima de ## archivos",
        textValidationLimitVideo: "Permitir sólo la carga de un vídeo",
        textAddMedia: "Añadir foto/vídeo",
        textSortBy: "Ordenar por",
        textSortByFeatured: "Destacado",
        textSortByTime: "Más recientes",
        textSortByHigh: "Calificación más alta",
        textSortByLow: "Calificación más baja",
        textSortByPhoto: "Foto primero",
        textLikeReview: "¿Útil?",
        textLikeReview1: "Gustar",
        textLikeReview2: "Votar",
        textVerified: "Verificado",
        textVerified1: "Comprado",
        textVerified2: "Compra verificada",
        textReview: "reseña",
        textReviews: "reseñas",
        textSeeReviews: "Ver reseñas de los clientes",
        textShowMore: "Ver más reseñas",
        textShowAll: "Mostrar todo",
        textPrevPage: "Página anterior",
        textNextPage: "Página siguiente",
        textReadMore: "Leer más",
        textAll: "Todo",
        textPhotoVideo: "Foto/vídeo",
        textPositive: "Positivo",
        textNegative: "Negativo",
      },
      Portuguese: {
        textWidgetTitle: "Avaliações de Clientes",
        textSidebar: "Avaliações de Clientes",
        textFeaturedReviews: "Avaliações em destaque",
        textFeaturedTitle: "O que as pessoas estão dizendo",
        textReviewButton: "Escrever avaliação",
        textReviewButtonNone: "Seja o primeiro a escrever avaliação",
        textShopReply: "Resposta",
        textReviewSummary: "Com base nas #reviews de #raters",
        textReviewerName: "Seu nome",
        textReviewerEmail: "Seu email",
        textReviewRating: "Sua Classificação",
        textReviewTitle: "Título",
        textReviewContent: "Contente",
        textSubmitReview: "Enviar avaliação",
        textSendingReview: "Revise o envio...",
        textReviewSuccess: "Obrigado pela avaliação!",
        textReviewFailed: "Ops! Algo deu errado!",
        textUploadMediaFailed: "Não foi possível enviar foto/vídeo.",
        textRating: "Por favor, dê-nos a sua classificação",
        textRating1: "Você avaliou 1 estrela",
        textRating2: "Você avaliou 2 estrelas",
        textRating3: "Você avaliou 3 estrelas",
        textRating4: "Você avaliou 4 estrelas",
        textRating5: "Você avaliou 5 estrelas",
        textValidationName: "Por favor insira seu nome",
        textValidationEmail: "Por favor insira um endereço de e-mail válido",
        textValidationContent: "Insira o conteúdo da revisão",
        textValidationLimitFiles: "Permitir upload máximo ## de arquivos",
        textValidationLimitVideo: "Permitir apenas o upload de um vídeo",
        textAddMedia: "Adicionar foto/vídeo",
        textSortBy: "Ordenar por",
        textSortByFeatured: "Apresentou",
        textSortByTime: "Mais recente",
        textSortByHigh: "Classificação mais alta",
        textSortByLow: "Classificação mais baixa",
        textSortByPhoto: "Foto primeiro",
        textLikeReview: "Útil?",
        textLikeReview1: "Como",
        textLikeReview2: "Voto",
        textVerified: "Verificado",
        textVerified1: "Comprado",
        textVerified2: "Compra verificada",
        textReview: "avaliação",
        textReviews: "avaliações",
        textSeeReviews: "Veja avaliações de clientes",
        textShowMore: "Ver mais avaliações",
        textShowAll: "Mostre tudo",
        textPrevPage: "Página anterior",
        textNextPage: "Próxima página",
        textReadMore: "Mais",
        textAll: "Todos",
        textPhotoVideo: "Foto/vídeo",
        textPositive: "Positivo",
        textNegative: "Negativo",
      },
      Dutch: {
        textWidgetTitle: "Klantbeoordelingen",
        textSidebar: "Klantbeoordelingen",
        textFeaturedReviews: "Uitgelichte Recensies",
        textFeaturedTitle: "Wat mensen zeggen",
        textReviewButton: "Een recensie schrijven",
        textReviewButtonNone: "Wees de eerste die een recensie schrijft",
        textShopReply: "Heeft geantwoord",
        textReviewSummary: "Gebaseerd op #reviews van #raters",
        textReviewerName: "Uw naam",
        textReviewerEmail: "Jouw email",
        textReviewRating: "Jouw beoordeling",
        textReviewTitle: "Titel",
        textReviewContent: "Inhoud",
        textSubmitReview: "Review versturen",
        textSendingReview: "Verzenden controleren...",
        textReviewSuccess: "Bedankt voor de recensie!",
        textReviewFailed: "Oeps! Er is iets fout gegaan!",
        textUploadMediaFailed: "Kan foto/video niet uploaden.",
        textRating: "Geef ons uw beoordeling",
        textRating1: "U heeft 1 ster beoordeeld",
        textRating2: "U heeft 2 sterren beoordeeld",
        textRating3: "U heeft 3 sterren beoordeeld",
        textRating4: "U heeft 4 sterren beoordeeld",
        textRating5: "U heeft 5 sterren beoordeeld",
        textValidationName: "Voer uw naam in",
        textValidationEmail: "Voer een geldig e-mailadres in",
        textValidationContent: "Voer de recensie-inhoud in",
        textValidationLimitFiles: "Sta maximale upload van ## bestanden toe",
        textValidationLimitVideo: "Sta slechts één video-upload toe",
        textAddMedia: "Voeg foto/video toe",
        textSortBy: "Sorteer op",
        textSortByFeatured: "Uitgelicht",
        textSortByTime: "Meest recente",
        textSortByHigh: "Hoogste beoordeling",
        textSortByLow: "Laagste beoordeling",
        textSortByPhoto: "Foto eerst",
        textLikeReview: "Behulpzaam?",
        textLikeReview1: "Leuk vinden",
        textLikeReview2: "Stemmen",
        textVerified: "Geverifieerd",
        textVerified1: "Gekocht",
        textVerified2: "Aankoop geverifieerd",
        textReview: "recensie",
        textReviews: "recensies",
        textSeeReviews: "Zie klantrecensies",
        textShowMore: "Bekijk meer recensies",
        textShowAll: "Toon alles",
        textPrevPage: "Vorige pagina",
        textNextPage: "Volgende pagina",
        textReadMore: "Lees verder",
        textAll: "Alle",
        textPhotoVideo: "Foto/video",
        textPositive: "Positief",
        textNegative: "Negatief",
      },
      Italian: {
        textWidgetTitle: "Recensioni dei clienti",
        textSidebar: "Recensioni dei clienti",
        textFeaturedReviews: "Recensioni in primo piano",
        textFeaturedTitle: "Cosa dice la gente",
        textReviewButton: "Scrivi una recensione",
        textReviewButtonNone: "Puoi essere il primo a scrivere una recensione",
        textShopReply: "Risposto",
        textReviewSummary: "Basato sulle #reviews di #raters",
        textReviewerName: "Il tuo nome",
        textReviewerEmail: "La tua email",
        textReviewRating: "Il tuo Valutazione",
        textReviewTitle: "Titolo",
        textReviewContent: "Contenuto",
        textSubmitReview: "Invia recensione",
        textSendingReview: "Invio recensione...",
        textReviewSuccess: "Grazie per la recensione!",
        textReviewFailed: "Ops! Qualcosa è andato storto!",
        textUploadMediaFailed: "Impossibile caricare foto/video.",
        textRating: "Per favore, dacci la tua valutazione",
        textRating1: "Hai valutato 1 stella",
        textRating2: "Hai valutato 2 stelle",
        textRating3: "Hai valutato 3 stelle",
        textRating4: "Hai valutato 4 stelle",
        textRating5: "Hai valutato 5 stelle",
        textValidationName: "Per favore inserisci il tuo nome",
        textValidationEmail: "Inserisci un indirizzo email valido",
        textValidationContent: "Inserisci il contenuto della recensione",
        textValidationLimitFiles: "Consenti il caricamento massimo di ## file",
        textValidationLimitVideo: "Consenti solo il caricamento di un video",
        textAddMedia: "Aggiungi foto/video",
        textSortBy: "Ordina per",
        textSortByFeatured: "In primo piano",
        textSortByTime: "Piu recente",
        textSortByHigh: "Voto più alto",
        textSortByLow: "Voto più basso",
        textSortByPhoto: "Prima la foto",
        textLikeReview: "Utile?",
        textLikeReview1: "Come",
        textLikeReview2: "Votazione",
        textVerified: "Verificato",
        textVerified1: "Acquistato",
        textVerified2: "Acquisto verificato",
        textReview: "recensione",
        textReviews: "recensioni",
        textSeeReviews: "Vedi le recensioni dei clienti",
        textShowMore: "Vedi più recensioni",
        textShowAll: "Mostra tutto",
        textPrevPage: "Pagina precedente",
        textNextPage: "Pagina successiva",
        textReadMore: "Di più",
        textAll: "Tutto",
        textPhotoVideo: "Foto/video",
        textPositive: "Positivo",
        textNegative: "Negativo",
      },
      Germany: {
        textWidgetTitle: "Kundenbewertungen",
        textSidebar: "Kundenbewertungen",
        textFeaturedReviews: "Empfohlene Rezensionen",
        textFeaturedTitle: "Was sagen die Leute",
        textReviewButton: "Eine Rezension schreiben",
        textReviewButtonNone: "Sei der erste der eine Rezension schreibt",
        textShopReply: "Hat geantwortet",
        textReviewSummary: "Basierend auf #raters #reviews",
        textReviewerName: "Ihr Name",
        textReviewerEmail: "Ihre Email",
        textReviewRating: "Ihre Bewertung",
        textReviewTitle: "Titel",
        textReviewContent: "Inhalt",
        textSubmitReview: "Bewertung abschicken",
        textSendingReview: "Bewertung wird gesendet...",
        textReviewSuccess: "Vielen Dank für die Rezension!",
        textReviewFailed: "Hoppla! Etwas ist schief gelaufen!",
        textUploadMediaFailed: "Foto/Video konnte nicht hochgeladen werden.",
        textRating: "Bitte geben Sie uns Ihre Bewertung ab",
        textRating1: "Sie haben 1 Stern bewertet",
        textRating2: "Sie haben 2 Sterne bewertet",
        textRating3: "Sie haben 3 Sterne bewertet",
        textRating4: "Sie haben 4 Sterne bewertet",
        textRating5: "Sie haben 5 Sterne bewertet",
        textValidationName: "Bitte geben Sie Ihren Namen ein",
        textValidationEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        textValidationContent: "Bitte geben Sie den Bewertungsinhalt ein",
        textValidationLimitFiles: "Maximales Hochladen von ## Dateien zulassen",
        textValidationLimitVideo: "Erlauben Sie nur einen Video-Upload",
        textAddMedia: "Foto/Video hinzufügen",
        textSortBy: "Sortiere nach",
        textSortByFeatured: "Hervorgehoben",
        textSortByTime: "Neueste",
        textSortByHigh: "Höchste Bewertung",
        textSortByLow: "Niedrigste Bewertung",
        textSortByPhoto: "Foto zuerst",
        textLikeReview: "Hilfreich?",
        textLikeReview1: "Wie",
        textLikeReview2: "Abstimmung",
        textVerified: "Verifiziert",
        textVerified1: "Gekauft",
        textVerified2: "Kauf verifiziert",
        textReview: "Bewertung",
        textReviews: "Bewertungen",
        textSeeReviews: "Sehen Sie sich Kundenrezensionen an",
        textShowMore: "Weitere Bewertungen anzeigen",
        textShowAll: "Zeige alles",
        textPrevPage: "Vorherige Seite",
        textNextPage: "Nächste Seite",
        textReadMore: "Mehr lesen",
        textAll: "Alle",
        textPhotoVideo: "Foto/Video",
        textPositive: "Positiv",
        textNegative: "Negativ",
      },
      Polish: {
        textWidgetTitle: "Recenzje klientów",
        textSidebar: "Recenzje klientów",
        textFeaturedReviews: "Polecane recenzje",
        textFeaturedTitle: "Co ludzie mówią",
        textReviewButton: "Napisz recenzję",
        textReviewButtonNone: "Napisz recenzję jako pierwszy",
        textShopReply: "Odpowiedział",
        textReviewSummary: "Na podstawie #reviews #raters",
        textReviewerName: "Twoje imię",
        textReviewerEmail: "Twój email",
        textReviewRating: "Twoja ocena",
        textReviewTitle: "Tytuł",
        textReviewContent: "Zadowolony",
        textSubmitReview: "Dodaj recenzję",
        textSendingReview: "Przesyłanie recenzje...",
        textReviewSuccess: "Dziękujemy za recenzję!",
        textReviewFailed: "Ups! Coś poszło nie tak!",
        textUploadMediaFailed: "Nie można przesłać zdjęcia/filmu.",
        textRating: "Proszę o ocenę",
        textRating1: "Oceniłeś 1 gwiazdkę",
        textRating2: "Oceniłeś 2 gwiazdki",
        textRating3: "Oceniłeś 3 gwiazdki",
        textRating4: "Oceniłeś 4 gwiazdki",
        textRating5: "Oceniłeś 5 gwiazdek",
        textValidationName: "Proszę wpisać swoje imię",
        textValidationEmail: "Proszę wprowadzić prawidłowy adres e-mail",
        textValidationContent: "Proszę wprowadź treść recenzję",
        textValidationLimitFiles:
          "Zezwalaj na przesyłanie maksymalnie ## plików",
        textValidationLimitVideo: "Zezwalaj na przesyłanie tylko jednego filmu",
        textAddMedia: "Dodaj zdjęcie/film",
        textSortBy: "Sortuj według",
        textSortByFeatured: "Wybitny",
        textSortByTime: "Najnowsze opinie o produkcie",
        textSortByHigh: "Najwyższa ocena",
        textSortByLow: "Najniższa ocena",
        textSortByPhoto: "Pierwsze zdjęcie",
        textLikeReview: "Pomocna?",
        textLikeReview1: "Lubię",
        textLikeReview2: "Głosować",
        textVerified: "Zweryfikowany",
        textVerified1: "Zakupiony",
        textVerified2: "Zweryfikowany zakup",
        textReview: "recenzję",
        textReviews: "recenzje",
        textSeeReviews: "Zobacz recenzje klientów",
        textShowMore: "Zobacz więcej recenzji",
        textShowAll: "Pokaż wszystko",
        textPrevPage: "Poprzednia strona",
        textNextPage: "Następna strona",
        textReadMore: "Czytaj więcej",
        textAll: "Wszystko",
        textPhotoVideo: "Zdjęcie/wideo",
        textPositive: "Pozytywny",
        textNegative: "Negatywny",
      },
      Russian: {
        textWidgetTitle: "Отзывы клиентов",
        textSidebar: "Отзывы клиентов",
        textFeaturedReviews: "Рекомендуемые обзоры",
        textFeaturedTitle: "Что говорят люди",
        textReviewButton: "Написать обзор",
        textReviewButtonNone: "Будь первым, кто напишет обзор",
        textShopReply: "Ответил",
        textReviewSummary: "Ha основе отзывов #raters",
        textReviewerName: "Ваше имя",
        textReviewerEmail: "Ваш адрес электронной почты",
        textReviewRating: "Ваш рейтинг",
        textReviewTitle: "Заголовок",
        textReviewContent: "Содержание",
        textSubmitReview: "Добавить отзыв",
        textSendingReview: "Проверить отправку...",
        textReviewSuccess: "Спасибо за обзор!",
        textReviewFailed: "Упс! Что-то пошло не так!",
        textUploadMediaFailed: "He удалось загрузить фото/видео.",
        textRating: "Пожалуйста, дайте нам свою оценку",
        textRating1: "Вы поставили оценку 1 звезда",
        textRating2: "Вы поставили оценку 2 звезды",
        textRating3: "Вы поставили оценку 3 звезды",
        textRating4: "Вы поставили оценку 4 звезды",
        textRating5: "Вы поставили оценку 5 звезд",
        textValidationName: "Пожалуйста, введите ваше имя",
        textValidationEmail:
          "Пожалуйста, введите действительный адрес электронной почты",
        textValidationContent: "Пожалуйста, введите содержание обзора",
        textValidationLimitFiles: "Разрешить загрузку максимум ## файлов",
        textValidationLimitVideo: "Разрешить загрузку только одного видео",
        textAddMedia: "Добавить фото/видео",
        textSortBy: "Сортировать по",
        textSortByFeatured: "Рекомендуемые",
        textSortByTime: "Самый последний",
        textSortByHigh: "Высший рейтинг",
        textSortByLow: "Самый низкий рейтинг",
        textSortByPhoto: "Фото первое",
        textLikeReview: "Полезный?",
        textLikeReview1: "Нравиться",
        textLikeReview2: "Голосование",
        textVerified: "Проверено",
        textVerified1: "Куплено",
        textVerified2: "Покупка подтверждена",
        textReview: "обзор",
        textReviews: "обзоры",
        textSeeReviews: "Посмотрите отзывы клиентов",
        textShowMore: "Посмотреть больше отзывов",
        textShowAll: "Показать все",
        textPrevPage: "Предыдущая страница",
        textNextPage: "Следующая страница",
        textReadMore: "Читать далее",
        textAll: "Все",
        textPhotoVideo: "Фото/видео",
        textPositive: "Позитивный",
        textNegative: "Отрицательный",
      },
      Swedish: {
        textWidgetTitle: "Kundrecensioner",
        textSidebar: "Kundrecensioner",
        textFeaturedReviews: "Utvalda recensioner",
        textFeaturedTitle: "Vad folk säger",
        textReviewButton: "Skriv en recension",
        textReviewButtonNone: "Var den första att skriva en recension",
        textShopReply: "Svarade",
        textReviewSummary: "Baserat på #raters #reviews",
        textReviewerName: "Ditt namn",
        textReviewerEmail: "Ditt email",
        textReviewRating: "Ditt betyg",
        textReviewTitle: "Titel",
        textReviewContent: "Innehåll",
        textSubmitReview: "Skicka recension",
        textSendingReview: "Granska att skicka...",
        textReviewSuccess: "Tack för recensionen!",
        textReviewFailed: "hoppsan! Något gick fel!",
        textUploadMediaFailed: "Kunde inte ladda upp foto/video.",
        textRating: "Snälla du ge oss ditt betyg",
        textRating1: "Du har gett 1 stjärna",
        textRating2: "Du har gett 2 stjärnor",
        textRating3: "Du har gett 3 stjärnor",
        textRating4: "Du har gett 4 stjärnor",
        textRating5: "Du har gett 5 stjärnor",
        textValidationName: "Snälla du vänligen ange ditt namn",
        textValidationEmail: "Snälla du ange en giltig e-postadress",
        textValidationContent: "Snälla du ange recension innehåll",
        textValidationLimitFiles: "Tillåt maximalt ## filer uppladdning",
        textValidationLimitVideo: "Tillåt endast en videouppladdning",
        textAddMedia: "Lägg till foto/video",
        textSortBy: "Sortera efter",
        textSortByFeatured: "Utestående",
        textSortByTime: "Senaste",
        textSortByHigh: "Högsta betyg",
        textSortByLow: "Lägsta betyg",
        textSortByPhoto: "Foto först",
        textLikeReview: "Hjälpsam?",
        textLikeReview1: "Tycka om",
        textLikeReview2: "Rösta",
        textVerified: "Verifierad",
        textVerified1: "Köpt",
        textVerified2: "Verifierade köp",
        textReview: "recension",
        textReviews: "recensioner",
        textSeeReviews: "Se kundrecensioner",
        textShowMore: "Se fler recensioner",
        textShowAll: "Visa allt",
        textPrevPage: "Föregående sida",
        textNextPage: "Nästa sida",
        textReadMore: "Läs mer",
        textAll: "Allt",
        textPhotoVideo: "Foto/video",
        textPositive: "Positiv",
        textNegative: "Negativ",
      },
    },
  });

const buildPreviewUI = ({
  parent,
  config,
  reviews,
  summary,
  isMobile,
  isFeaturedWidget,
  subscriptionPlan,
  removeBranding,
  enableLogs,
}) => {
  Appio.isUIPreview = true;
  Appio.removeBranding = removeBranding;
  Appio.enableLogs = enableLogs;
  Appio.init({
    action: () => {
      Appio.buildStyles();
      Appio.buildReviewsWidget(Appio.container);
    },
    data: {
      parent,
      config,
      reviews,
      summary,
      isMobile,
      isFeaturedWidget,
      subscriptionPlan,
      pageType: "product",
      data: {
        page: 1,
        filter: "all",
        sort: "featured",
      },
    },
  });
};

try {
  $ = require("jquery");
  moment = require("moment");
  exports.__esModule = true;
  exports.default = buildPreviewUI;
} catch {
  //fallback here for storefront script
  if (window.AppioReviews === undefined) {
    window.AppioReviews = true;
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    )
      setTimeout(
        Appio.start,
        navigator.userAgent?.includes("moto g power") ? 5555 : 5
      );
    else window.addEventListener("load", Appio.start);
  }
}
