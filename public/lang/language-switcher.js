
document.addEventListener('DOMContentLoaded', function () {
    // console.log('DOM fully loaded and parsed'); 

    const languageButtons = document.querySelectorAll('.language-button');
    const elementsToSwitch = document.querySelectorAll('[data-key]');
    const translations = {
        "en": {
            "home": "Home",
            "products": "Products",
            "contactButton": "Contact Us",
            "productsButton": "Our Products",
            "about": "About",
            "contact": "Contact",
            "tagline": "We deliver quality steel and building materials",
            "intro": "Madad Gate Trading Company specializes in high-quality steel and building materials, committed to delivering excellence and fostering growth.",
            "ourImpact": "Our impact",
            "rateContent": "At Madad Gate Trading Company, we drive progress by providing high-quality steel and building materials for projects of all sizes, fostering trust, excellence, and growth in the construction industry across Saudi Arabia.",
            "companies": "Companies",
            "capitalInvestment": "Capital investment",
            "teamMembers": "Team members",
            "aboutHeader": "About our company",
            "aboutContent": "At Madad Gate, we specialize in the trading of steel and building materials, contributing to the prosperity of society...",
            "ourProducts": "Our products",
            "productContent": "Lorem ipsum dolor amet consectetur diam nulla nullam mauris turpis dis mi sitina nunc id lectus facilisi justo eu egestas amet.",
            "reinforcement": "Reinforcement Materials",
            "structuralSteel": "Structural Steel",
            "woodAndMiscellaneous": "Infastructure Service",
            "ourApproval": "Our Approval",
            "ourApprovalContent": "Trusted by Industry Leaders: Certified by SASO KSA, Aramco-approved mills, the Royal Commission for Jubail & Yanbu, Ma’aden, SEC, SABIC, NEOM, Red Sea Development, SEVEN, El Seif, and Saudi Railways.",
            "ourPartners": "Our partners",
            "partnerDescription": "Madad Gate Trading Company partners with top manufacturers and suppliers to deliver premium materials...",
            "pagesSpan": "Pages",
            "contactSpan": "Contact",
            "contactUs": "Contact Us",
            "contactUsContent": "To order your products , you can find us at",
            "OurProducts": "Our Products",
            "ProductsIntro": "Check out our full collection of products tailored to your needs",
            "AllProducts": "All Products",
            "ReinforcementMaterials": "Reinforcement Materials",
            "StructuralSteel": "Structural Steel",
            "WoodandMiscellaneousProducts": "Fabrication Service",
            "CarbonSteel": "Carbon Steel",
            "BuildingMaterials": "Building Materials",
            "FabricationService": "Fabrication Service",
            "CoatingService": "Coating Service",
            "AlloySteel": "Alloy Steel",
            "name": 'Name :',
            "address": 'Address :',
            "phone": 'Phone Number :',
            "subject": 'Subject :',
            "message": 'Message : ',
            "submitEmail": 'Order Now',
            "upload_doc": 'More Info',
            "historyOfSuccessTitle" : 'History of Success',
            "story_content" : 'Madad Gate Company strengthens its commitment to stakeholders with ISO 9001:2015 certification and recognition by the Local Contact & Government Procurement Authority (المحتوى المحلي). These certifications enhance sustainability, efficiency, and ensure a safe, healthy workplace for both employees and customers.',
            "infrastructure" : 'Infrastructure Service',
            "fab_header": "Fabrication Services",
            "fab_content": "At Madad Gate Trading Company, we provide comprehensive fabrication services that meet your project needs with precision and professionalism. Whether you require steel structures or custom metal designs, our skilled team uses the latest technologies to ensure the quality and accuracy of every product. We are committed to delivering innovative and practical solutions that support your projects and contribute to their success.",
            "service_fab": "We Offer You",
            "service_content_fab_one": "We provide high-precision cutting and welding services using the latest equipment and technologies. Whether you need cutting or welding for steel structures or complex metal designs, our team ensures the work is executed to the highest quality standards. We prioritize meeting your requirements on time and without delay.",
            "service_content_fab_two": "Our company specializes in manufacturing steel plates and bases used in large-scale construction projects. We offer custom designs tailored to your project needs, ensuring durability and safety. Whether you need steel plates or support bases, we guarantee high-quality products that last.",
            "ourWork": "Our Work",
            "select_product": "Select Product",
            "product-overview-title":"Product Overview",
            "available-sizes-title":"Available Sizes",
            "standards-title":"Standards",
            "category-title":"Category",
            "supplier-title":"Supplier Image",
        
        },
        "ar": {
            "home": "الرئيسية",
            "products": "المنتجات",
            "contactButton": "تواصل معنا",
            "productsButton": "تصفح منتجاتنا",
            "about": "من نحن",
            "contact": "اتصل بنا",
            "tagline":" نقدم أفضل مواد الفولاذ وخدمات التصنيع عالية الجودة",
            "intro": "تتخصص شركة بوابة مدد في تقديم حلول تصنيع مخصصة تلبي احتياجات عملائنا",
            "ourImpact": "تأثيرنا",
            "rateContent": "في شركة بوابة مدد، نسهم في تحقيق التقدم من خلال توفير مواد الفولاذ والبناء ذات الجودة العالية، مما يعزز الثقة والابتكار والنمو في قطاع البناء بالمملكة العربية السعودية.",
            "companies": "الشركات",
            "capitalInvestment": "الاستثمارات الرأسمالية",
            "teamMembers": "أعضاء الفريق",
            "aboutHeader": "من نحن",
            "aboutContent":'في بوابة المدد، نقدم خدمات تصنيع متكاملة بدقة واحترافية. نصنع هياكل حديدية وتصميمات معدنية مخصصة باستخدام أحدث التقنيات، مع ضمان الجودة ودعم نجاح مشاريعك',
            "ourProducts": "منتجاتنا",
            "productContent": "استكشف مجموعتنا المتنوعة من المنتجات التي تلبي احتياجات مختلف المشاريع، حيث نوفر لك الجودة والتميز في كل منتج.",
            "reinforcement": "مواد التسليح",
            "structuralSteel": "الفولاذ الهيكلي",
            "woodAndMiscellaneous": "خدمات التصنيع",
            "ourApproval": "شهادات اعتمادنا",
            "ourApprovalContent": "نحن فخورون بالحصول على اعتماد كبار قادة الصناعة، بما في ذلك SASO KSA، ومطاحن معتمدة من أرامكو، والهيئة الملكية للجبيل وينبع، ومعادن، وSEC، وSABIC، وNEOM، وغيرها من المشاريع الكبرى.",
            "ourPartners": "شركاؤنا",
            "partnerDescription": "بوابة مدد تتعاون مع نخبة من الشركات المصنعة والموردين لتقديم أفضل مواد البناء التي تجمع بين الجودة العالية والابتكار.",
            "pagesSpan": "الصفحات",
            "contactSpan": "تواصل معنا",
            "OurProducts": "منتجاتنا",
            "ProductsIntro": "اكتشف مجموعتنا الكاملة من المنتجات المصممة خصيصًا لتلبية احتياجاتك",
            "AllProducts": "جميع المنتجات",
            "CarbonSteel": "مواد التسليح",
            "StructuralSteel": "الفولاذ الهيكلي",
            "WoodandMiscellaneousProducts":"خدمات التصنيع",
            "contactUs": "تواصل معنا",
            "contactUsContent": "لطلب منتجاتك أو لمزيد من المعلومات، يمكنكم التواصل معنا عبر العنوان التالي",
            "ReinforcementMaterials": "مواد التسليح",
            "BuildingMaterials": "الفولاذ الهيكلي",
            "WoodandMiscellaneousProducts": "خدمات التصنيع",
            "FabricationService": "خدمة التصنيع",
            "CoatingService": "خدمة الطلاء",
            "AlloySteel": "الفولاذ السبائكي",
            "name": 'الاسم الكامل :',
            "address": 'البريد الالكتروني :',
            "phone": 'رقم الهاتف :',
            "subject": 'الموضوع :',
            "message": 'رسالة :',
            "submitEmail": 'اطلب الان',
            "upload_doc": 'حمل الوثيقة',
            "historyOfSuccessTitle": "تاريخ النجاح",
            "story_content": "بوابة مدد تعزز التزامها بأصحاب المصلحة عبر شهادة ISO 9001:2015 واعتراف هيئة المحتوى المحلي. هذه الشهادات تعزز الاستدامة والكفاءة، وتضمن بيئة عمل آمنة وصحية للجميع.",
            "fab_header" : 'خدمات التصنيع',
            "fab_content": 'في شركة بوابة المدد ، نقدم خدمات تصنيع متكاملة تلبي احتياجات مشاريعك بدقة واحترافية. سواء كنت بحاجة إلى هياكل حديدية أو تصميمات معدنية مخصصة، فإن فريقنا الماهر يستخدم أحدث التقنيات لضمان جودة ودقة كل منتج. نحن نلتزم بتقديم حلول مبتكرة وعملية تدعم مشاريعك وتساهم في نجاحها.',
            "service_fab_one" : 'قطع ولحام',
            "service_fab_two" : 'تصنيع ألواح',
            "service_content_fab_one" : 'نحن نقدم خدمات القطع واللحام بدقة عالية باستخدام أحدث المعدات والتقنيات. سواء كنت بحاجة إلى قطع أو لحام هياكل حديدية أو تصميمات معدنية معقدة، فإن فريقنا يضمن تنفيذ العمل بأعلى معايير الجودة. نحرص على تلبية متطلباتك في الوقت المحدد ودون تأخير.',       
            "service_content_fab_two" : 'تتخصص شركتنا في تصنيع الألواح والقواعد الحديدية التي تستخدم في المشاريع الإنشائية الكبرى. نقدم تصميمات مخصصة تلبي احتياجات مشاريعك، مع ضمان المتانة والسلامة. سواء كنت بحاجة إلى ألواح حديدية أو قواعد دعم، فإننا نضمن لك منتجات عالية الجودة تدوم طويلاً.',
            "ourWork" : 'اعمالنا',
            "select_product" : 'اختر منتوج',
            "product-overview-title": "نظرة عامة على المنتج",
            "available-sizes-title": "الأحجام المتاحة",
            "standards-title": "المعايير",
            "category-title": "الفئة",
            "supplier-title": "صورة المورد"
            
        },

        
        
            "zh": {
            "home": "首页",
            "products": "产品",
            "contactButton": "联系我们",
            "productsButton": "浏览我们的产品",
            "about": "关于我们",
            "contact": "联系我们",
            "tagline": "我们提供高品质的钢材和建筑材料",
            "intro": "Madad Gate贸易公司专注于优质钢材和建筑材料，以卓越品质和持续增长为目标。",
            "ourImpact": "我们的影响力",
            "rateContent": "在Madad Gate，我们通过为各种规模的项目提供高质量的钢材和建筑材料，促进信任、创新和沙特阿拉伯建筑行业的可持续发展。",
            "companies": "企业",
            "capitalInvestment": "资本投入",
            "teamMembers": "团队成员",
            "aboutHeader": "关于我们的公司",
            "aboutContent": "Madad Gate是一家专注于钢材和建筑材料贸易的公司，致力于为客户提供可靠、创新的解决方案，促进社会繁荣。",
            "ourProducts": "我们的产品",
            "productContent": "探索我们丰富多样的产品系列，为您的项目提供量身定制的优质解决方案。",
            "reinforcement": "增强材料",
            "structuralSteel": "结构钢",
            "woodAndMiscellaneous": "木材与杂项材料",
            "ourApproval": "我们的资质",
            "ourApprovalContent": "获得行业领袖的信任：包括SASO KSA认证、阿美石油批准的工厂、朱拜尔与延布皇家委员会、马阿登、SEC、SABIC、NEOM等知名项目的认证。",
            "ourPartners": "我们的合作伙伴",
            "partnerDescription": "Madad Gate与顶级制造商和供应商合作，提供高质量的建筑材料，为客户创造价值。",
            "pagesSpan": "页面",
            "contactSpan": "联系我们",
            "OurProducts": "我们的产品",
            "ProductsIntro": "浏览我们的完整产品系列，满足您的多样化需求",
            "AllProducts": "所有产品",
            "ReinforcementMaterials": "增强材料",
            "StructuralSteel": "结构钢",
            "WoodandMiscellaneousProducts": "木材及杂项产品",
            "contactUs": "联系我们",
            "contactUsContent": "如需订购或了解更多信息，请通过以下地址与我们联系",
            "CarbonSteel": "加固材料",
            "BuildingMaterials": "结构钢",
            "WoodandMiscellaneousProducts": "木材及杂项产品",
            "FabricationService": "制造服务",
            "CoatingService": "涂层服务",
            "AlloySteel": "合金钢",
            "name": "姓名：",
            "address": "地址：",
            "phone": "电话号码：",
            "subject": "主题：",
            "message": "消息：",
            "submitEmail": "立即下单",
            "historyOfSuccessTitle": "成功的历史",
            "story_content": "Madad Gate公司通过获得ISO 9001:2015认证以及本地联系与政府采购局（المحتوى المحلي）的认可，加强了对利益相关者的承诺。这些认证增强了可持续性、效率，并确保为员工和客户提供一个安全、健康的工作环境。",
            "fab_header": "制造服务",
            "fab_content": "在Madad Gate贸易公司，我们提供全面的制造服务，以精准和专业的方式满足您的项目需求。无论您需要钢结构还是定制金属设计，我们熟练的团队都使用最新技术来确保每个产品的质量和准确性。我们致力于提供创新和实用的解决方案，支持您的项目并为其成功做出贡献。",
            "service_fab": "我们为您提供",
            "service_content_fab_one": "我们使用最新的设备和技术提供高精度的切割和焊接服务。无论您需要切割或焊接钢结构还是复杂的金属设计，我们的团队都确保以最高质量标准执行工作。我们优先考虑按时满足您的需求，绝不延误。",
            "service_content_fab_two": "我们公司专门生产用于大型建筑项目的钢板和底座。我们提供根据您的项目需求定制的设计，确保耐用性和安全性。无论您需要钢板还是支撑底座，我们都能保证提供持久的高质量产品。",
            "ourWork": "我们的工作",
            "select_product": "选择产品",
            "product-overview-title": "产品概述",
            "available-sizes-title": "可用尺寸",
            "standards-title": "标准",
            "category-title": "类别",
            "supplier-title": "供应商图片"
        
        }
    };

    function setLanguagePreference(language) {
        try {
            sessionStorage.setItem('selectedLanguage', language);
            // console.log('Language preference saved:', language); 
        } catch (error) {
            console.error('Failed to save language preference:', error);
        }
    }

    function getLanguagePreference() {
        try {
            const language = sessionStorage.getItem('selectedLanguage');
            // console.log('Language preference retrieved:', language); 
            return language || 'ar'; 
        } catch (error) {
            console.error('Failed to retrieve language preference:', error);
            return 'ar'; 
        }
    }

    function switchLanguage(language) {
        console.log('Switching to language:', language); 
        elementsToSwitch.forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = translations[language]?.[key] || translations['en'][key] || `[${key}]`;
            element.innerHTML = translation;
        });

        changeDirectionAndFont(language);

        setLanguagePreference(language); 
    }

    function changeDirectionAndFont(language) {
        // console.log('Changing direction and font for language:', language); // Debugging line
        const containers = [
            'about_text_content',
            'product_section_header',
            'partners_section',
            'rate_container',
            'header_title',
            'main_section_products',
            'form',
            'app_header',
            'fab_service',
            'product_info_container'
        ];

        containers.forEach(className => {
            const container = document.querySelectorAll(`.${className}`);
            container.forEach(item => {
                if (language === 'ar') {
                    item.style.direction = "rtl";
                } else {
                    item.style.direction = "ltr";
                }
            });
        });

        if (language === 'ar') {
            document.body.style.fontFamily = '"Noto Kufi Arabic", serif';
        } else {
            document.body.style.fontFamily = '"Onest", serif';
        }

        document.querySelectorAll(".rate_num").forEach(rate => {
            rate.style.direction = language === 'ar' ? 'rtl' : 'ltr';
        });
    }

    const savedLanguage = getLanguagePreference();
    // console.log('Saved language from sessionStorage:', savedLanguage); 
    switchLanguage(savedLanguage);

    const languageSelect = document.getElementById('language-select');

    languageSelect.addEventListener('change', function () {
        const selectedOption = languageSelect.options[languageSelect.selectedIndex];
        const selectedLang = selectedOption.getAttribute('data-lang');
        // console.log('Language selected:', selectedLang);
        switchLanguage(selectedLang);
    });
}, 100); 
