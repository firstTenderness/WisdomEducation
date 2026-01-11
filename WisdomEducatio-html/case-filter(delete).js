document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('#caseFilterBtns button');
    const caseItems = document.querySelectorAll('.case-item');
    const carousel = document.getElementById('caseCarousel');
    let currentActiveItem = null;

    console.log('✅ 找到筛选按钮:', filterBtns.length);
    console.log('✅ 找到案例项:', caseItems.length);

    if (!filterBtns.length || !caseItems.length) {
        console.error('❌ 未找到筛选按钮或案例项！');
        return;
    }

    // 跟踪轮播当前项（假设 .case-item 在 .carousel-item 内）
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', function () {
            const activeCarouselItem = this.querySelector('.carousel-item.active');
            currentActiveItem = activeCarouselItem?.querySelector('.case-item') || null;
        });
    }

    // 更新轮播可见性
    function updateCarouselVisibility() {
        if (!carousel) return;

        const carouselItems = Array.from(carousel.querySelectorAll('.carousel-item'));
        const visibleIndices = [];

        carouselItems.forEach((item, index) => {
            const caseItem = item.querySelector('.case-item');
            if (caseItem && !caseItem.classList.contains('hidden')) {
                visibleIndices.push(index);
            }
        });

        if (visibleIndices.length === 0) return;

        const currentActiveCarousel = carousel.querySelector('.carousel-item.active');
        const currentIndex = carouselItems.indexOf(currentActiveCarousel);

        if (currentIndex !== -1 && !visibleIndices.includes(currentIndex)) {
            const targetIndex = visibleIndices[0];
            console.log(`🔄 跳转到可见案例索引: ${targetIndex}`);
            bootstrap.Carousel.getInstance(carousel)?.to(targetIndex);
        }
    }

    // 绑定筛选按钮
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const type = this.dataset.type;
            caseItems.forEach(item => {
                const itemType = item.dataset.type;
                if (type === 'all' || itemType === type) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // 👈 关键：更新轮播
            updateCarouselVisibility();
        });
    });

    // 初始化
    const activeBtn = document.querySelector('#caseFilterBtns .btn.active');
    if (activeBtn) {
        activeBtn.click();
    } else if (filterBtns[0]) {
        filterBtns[0].classList.add('active');
        filterBtns[0].click();
    }
});