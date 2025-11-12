// 八字排盘功能
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 地支对应生肖
const zodiacAnimals = {
    '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
    '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
    '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪'
};

// 星座数据
const constellationData = {
    aries: { name: '白羊座', dates: '3.21-4.19', element: '火', ruler: '火星' },
    taurus: { name: '金牛座', dates: '4.20-5.20', element: '土', ruler: '金星' },
    gemini: { name: '双子座', dates: '5.21-6.21', element: '风', ruler: '水星' },
    cancer: { name: '巨蟹座', dates: '6.22-7.22', element: '水', ruler: '月亮' },
    leo: { name: '狮子座', dates: '7.23-8.22', element: '火', ruler: '太阳' },
    virgo: { name: '处女座', dates: '8.23-9.22', element: '土', ruler: '水星' },
    libra: { name: '天秤座', dates: '9.23-10.23', element: '风', ruler: '金星' },
    scorpio: { name: '天蝎座', dates: '10.24-11.22', element: '水', ruler: '冥王星' },
    sagittarius: { name: '射手座', dates: '11.23-12.21', element: '火', ruler: '木星' },
    capricorn: { name: '摩羯座', dates: '12.22-1.19', element: '土', ruler: '土星' },
    aquarius: { name: '水瓶座', dates: '1.20-2.18', element: '风', ruler: '天王星' },
    pisces: { name: '双鱼座', dates: '2.19-3.20', element: '水', ruler: '海王星' }
};

// 姓名学笔画数据
const strokeData = {
    '一': 1, '二': 2, '三': 3, '四': 5, '五': 4, '六': 4, '七': 2, '八': 2, '九': 2, '十': 2,
    '人': 2, '大': 3, '小': 3, '中': 4, '上': 3, '下': 3, '左': 5, '右': 5, '东': 5, '西': 6,
    '南': 9, '北': 5, '中': 4, '天': 4, '地': 6, '山': 3, '水': 4, '火': 4, '木': 4, '金': 8,
    '王': 4, '李': 7, '张': 11, '刘': 6, '陈': 7, '杨': 7, '黄': 12, '赵': 14, '吴': 7, '周': 8,
    '徐': 10, '孙': 6, '马': 3, '朱': 6, '胡': 9, '郭': 10, '林': 8, '何': 7, '高': 10, '梁': 11,
    '郑': 10, '罗': 8, '宋': 7, '谢': 12, '唐': 10, '韩': 12, '杨': 7, '许': 6, '冯': 5, '邓': 4,
    '曹': 11, '彭': 12, '曾': 12, '肖': 7, '田': 5, '董': 12, '袁': 10, '潘': 16, '于': 3, '蒋': 13,
    '蔡': 17, '余': 7, '杜': 7, '叶': 5, '程': 12, '魏': 17, '苏': 22, '吕': 6, '丁': 2, '任': 6,
    '沈': 7, '姚': 9, '卢': 5, '姜': 9, '崔': 11, '钟': 17, '谭': 14, '陆': 7, '汪': 8, '范': 8,
    '金': 8, '石': 5, '廖': 14, '贾': 10, '夏': 10, '韦': 4, '付': 5, '方': 4, '白': 5, '邹': 17,
    '孟': 8, '熊': 14, '秦': 10, '邱': 12, '江': 6, '尹': 4, '薛': 16, '闫': 11, '段': 9, '雷': 13,
    '侯': 9, '龙': 16, '史': 5, '陶': 10, '黎': 15, '贺': 9, '顾': 10, '毛': 4, '郝': 9, '龚': 11,
    '邵': 7, '万': 3, '钱': 10, '严': 9, '覃': 12, '武': 8, '戴': 18, '莫': 10, '孔': 4, '向': 6
};

// 星座运势文本
const horoscopeTexts = {
    aries: {
        overall: "今天你的活力充沛，适合开始新的计划。你的领导能力会得到认可。",
        love: "感情方面，单身者有机会遇到心仪对象，有伴侣者关系稳定。",
        career: "工作上积极主动，能够得到上级的支持。适合开拓新业务。",
        wealth: "财运平稳，不宜进行大额投资。理性消费是明智之选。"
    },
    taurus: {
        overall: "今天适合专注于具体事务，稳扎稳打能够带来好结果。",
        love: "感情稳定发展，适合与伴侣进行深入沟通。单身者不宜急躁。",
        career: "工作效率很高，能够完成重要任务。专业能力受到赞赏。",
        wealth: "财运不错，适合进行长期理财规划。避免冲动消费。"
    },
    gemini: {
        overall: "今天沟通能力很强，适合社交和学习新知识。",
        love: "魅力四射，容易吸引他人注意。但要注意真诚沟通。",
        career: "创意丰富，适合进行头脑风暴和项目策划。",
        wealth: "财运波动较大，投资需谨慎。可能有意外收入。"
    },
    cancer: {
        overall: "今天情绪敏感，需要平衡内心的感受。",
        love: "感情丰富，容易与伴侣产生深度连接。单身者期待爱情。",
        career: "工作稳定，适合处理需要耐心的任务。团队协作顺利。",
        wealth: "财运平稳，适合储蓄和保守理财。"
    },
    leo: {
        overall: "今天自信心满满，适合展现自己的才能。",
        love: "魅力十足，容易成为焦点。感情进展顺利。",
        career: "领导能力突出，能够带领团队取得好成绩。",
        wealth: "财运上升，可能有额外收入机会。但要避免铺张。"
    },
    virgo: {
        overall: "今天注重细节，追求完美的态度会带来好成果。",
        love: "感情细腻，关心伴侣的感受。关系稳定发展。",
        career: "工作认真负责，能够发现并解决问题。获得认可。",
        wealth: "理财能力强，适合进行详细财务规划。"
    },
    libra: {
        overall: "今天追求和谐平衡，适合处理人际关系。",
        love: "感情和谐，与伴侣关系融洽。单身者遇到理想对象。",
        career: "团队合作顺利，外交能力强。适合谈判和协调工作。",
        wealth: "财运平衡，收入和支出相对稳定。适合长期投资。"
    },
    scorpio: {
        overall: "今天直觉敏锐，能够洞察事物的本质。",
        love: "感情深沉，与伴侣关系更加亲密。单身者不要过于神秘。",
        career: "洞察力强，能够发现隐藏的机会。工作有突破性进展。",
        wealth: "有偏财运，但要警惕风险。投资前要充分调研。"
    },
    sagittarius: {
        overall: "今天充满冒险精神，适合尝试新事物。",
        love: "感情自由奔放，给彼此空间很重要。单身者喜欢自由恋爱。",
        career: "适合开拓新领域，学习和培训能够提升竞争力。",
        wealth: "财运起伏较大，投机有风险。稳健投资更可靠。"
    },
    capricorn: {
        overall: "今天务实稳重，脚踏实地能够取得成就。",
        love: "感情认真负责，适合考虑长远发展。单身者注重品质。",
        career: "工作能力强，职业发展稳步上升。获得上级信任。",
        wealth: "理财谨慎，适合长期投资和财务规划。"
    },
    aquarius: {
        overall: "今天创新思维活跃，适合突破传统。",
        love: "感情独特，追求精神层面的契合。单身者喜欢与众不同。",
        career: "创意丰富，适合从事创新性工作。想法能够得到认可。",
        wealth: "财运创新，可能有非传统收入来源。投资需理性。"
    },
    pisces: {
        overall: "今天直觉敏感，适合从事创意工作。",
        love: "感情浪漫，与伴侣有美好的情感体验。单身者期待真爱。",
        career: "艺术灵感丰富，适合从事文化创意工作。",
        wealth: "财运感性，投资要靠直觉也要理性。避免情感冲动消费。"
    }
};

// 八字排盘计算函数
function calculateBazi() {
    const birthDate = document.getElementById('birth-date').value;
    const birthTime = document.getElementById('birth-time').value;
    const gender = document.getElementById('gender').value;

    if (!birthDate || !birthTime) {
        alert('请输入完整的出生信息');
        return;
    }

    const date = new Date(birthDate + 'T' + birthTime);

    // 计算年柱
    const yearStem = heavenlyStems[(date.getFullYear() - 4) % 10];
    const yearBranch = earthlyBranches[(date.getFullYear() - 4) % 12];

    // 计算月柱 (简化版)
    const month = date.getMonth();
    const monthStem = heavenlyStems[(month + 2) % 10];
    const monthBranch = earthlyBranches[month + 2 >= 12 ? month - 10 : month + 2];

    // 计算日柱
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const dayStem = heavenlyStems[(dayOfYear - 1) % 10];
    const dayBranch = earthlyBranches[(dayOfYear - 1) % 12];

    // 计算时柱
    const hour = date.getHours();
    let timeBranchIndex;
    if (hour >= 23 || hour < 1) timeBranchIndex = 0; // 子时
    else if (hour >= 1 && hour < 3) timeBranchIndex = 1; // 丑时
    else if (hour >= 3 && hour < 5) timeBranchIndex = 2; // 寅时
    else if (hour >= 5 && hour < 7) timeBranchIndex = 3; // 卯时
    else if (hour >= 7 && hour < 9) timeBranchIndex = 4; // 辰时
    else if (hour >= 9 && hour < 11) timeBranchIndex = 5; // 巳时
    else if (hour >= 11 && hour < 13) timeBranchIndex = 6; // 午时
    else if (hour >= 13 && hour < 15) timeBranchIndex = 7; // 未时
    else if (hour >= 15 && hour < 17) timeBranchIndex = 8; // 申时
    else if (hour >= 17 && hour < 19) timeBranchIndex = 9; // 酉时
    else if (hour >= 19 && hour < 21) timeBranchIndex = 10; // 戌时
    else timeBranchIndex = 11; // 亥时

    const timeStem = heavenlyStems[(dayOfYear - 1) * 2 + timeBranchIndex % 10];
    const timeBranch = earthlyBranches[timeBranchIndex];

    // 显示结果
    const baziResult = document.getElementById('bazi-result');
    const baziDetails = document.getElementById('bazi-details');

    baziDetails.innerHTML = `
        <div class="bazi-table">
            <h4>四柱八字</h4>
            <table class="bazi-chart">
                <tr>
                    <th>年柱</th>
                    <th>月柱</th>
                    <th>日柱</th>
                    <th>时柱</th>
                </tr>
                <tr>
                    <td>${yearStem}${yearBranch}</td>
                    <td>${monthStem}${monthBranch}</td>
                    <td>${dayStem}${dayBranch}</td>
                    <td>${timeStem}${timeBranch}</td>
                </tr>
                <tr>
                    <td>${yearStem} ${yearBranch}${zodiacAnimals[yearBranch]}</td>
                    <td>${monthStem} ${monthBranch}</td>
                    <td>${dayStem} ${dayBranch}</td>
                    <td>${timeStem} ${timeBranch}</td>
                </tr>
            </table>
        </div>
        <div class="bazi-analysis">
            <h4>命理分析</h4>
            <p><strong>日主：</strong>${dayStem}${dayBranch}</p>
            <p><strong>性别：</strong>${gender === 'male' ? '男命' : '女命'}</p>
            <p><strong>出生：</strong>${date.toLocaleDateString('zh-CN')} ${birthTime}</p>
            <div class="personality">
                <h5>性格特点：</h5>
                <ul>
                    <li>${getPersonalityTrait(dayStem, dayBranch)}</li>
                    <li>${getElementTrait(yearStem)}</li>
                    <li>${getZodiacTrait(yearBranch)}</li>
                </ul>
            </div>
            <div class="fortune">
                <h5>运势分析：</h5>
                <p>${getFortuneAnalysis(dayStem, gender)}</p>
            </div>
            <div class="suggestions">
                <h5>命理建议：</h5>
                <p>${getLifeSuggestions(dayStem, yearBranch)}</p>
            </div>
        </div>
    `;

    baziResult.style.display = 'block';
    baziResult.scrollIntoView({ behavior: 'smooth' });
}

// 获取性格特点
function getPersonalityTrait(stem, branch) {
    const traits = {
        '甲子': '性格正直，有领导才能，但有时过于固执',
        '乙丑': '温和善良，有耐心，适合稳定发展',
        '丙寅': '热情奔放，创意丰富，但要注意控制脾气',
        '丁卯': '聪明机智，善于沟通，人际关系良好',
        '戊辰': '稳重可靠，责任心强，适合管理工作',
        '己巳': '细心谨慎，追求完美，有时过于焦虑',
        '庚午': '坚强果断，有事业心，但要注意他人感受',
        '辛未': '心思细腻，有艺术天赋，适合创意工作',
        '壬申': '聪明智慧，适应能力强，但缺乏恒心',
        '癸酉': '温柔体贴，有同情心，适合服务性行业'
    };
    return traits[stem + branch] || '性格独特，有发展潜力';
}

// 获取五行特质
function getElementTrait(stem) {
    const elements = {
        '甲': '木 - 仁慈善良，有生长发展之象',
        '乙': '木 - 温和柔顺，善于包容他人',
        '丙': '火 - 热情开朗，有领导才能',
        '丁': '火 - 温文尔雅，有艺术天赋',
        '戊': '土 - 稳重可靠，值得信赖',
        '己': '土 - 谦逊温和，善于配合',
        '庚': '金 - 坚强果断，有正义感',
        '辛': '金 - 细致谨慎，追求完美',
        '壬': '水 - 聪明智慧，适应力强',
        '癸': '水 - 温柔体贴，有同情心'
    };
    return elements[stem] || '五行平衡';
}

// 获取生肖特质
function getZodiacTrait(branch) {
    const zodiacTraits = {
        '子': '鼠 - 聪明机智，善于理财',
        '丑': '牛 - 勤劳踏实，值得信赖',
        '寅': '虎 - 勇敢果断，有领导能力',
        '卯': '兔 - 温和善良，人缘好',
        '辰': '龙 - 自信骄傲，有远大理想',
        '巳': '蛇 - 智慧神秘，洞察力强',
        '午': '马 - 热情奔放，喜欢自由',
        '未': '羊 - 温和善良，有艺术天赋',
        '申': '猴 - 聪明伶俐，适应力强',
        '酉': '鸡 - 守时守信，追求完美',
        '戌': '狗 - 忠诚可靠，有正义感',
        '亥': '猪 - 慷慨大方，心地善良'
    };
    return zodiacTraits[branch] || '生肖特质平和';
}

// 获取运势分析
function getFortuneAnalysis(stem, gender) {
    const fortunes = {
        '甲': gender === 'male' ? '事业运势良好，宜积极进取，中年有望成就' : '婚姻运势稳定，宜选择成熟稳重的伴侣',
        '乙': gender === 'male' ? '财运亨通，但要注意理财规划' : '人际关系和谐，适合从事社交工作',
        '丙': gender === 'male' ? '贵人相助，事业发展顺利' : '家庭运势良好，宜重视亲情',
        '丁': gender === 'male' ? '学业运势佳，宜继续深造' : '感情运势上升，有机会遇到良缘',
        '戊': gender === 'male' ? '事业稳定，宜脚踏实地' : '健康运势良好，注重养生',
        '己': gender === 'male' ? '财运稳定，宜保守理财' : '家庭和谐，宜多关心家人',
        '庚': gender === 'male' ? '事业发展快速，但要注意人际关系' : '感情运势波动，需要耐心经营',
        '辛': gender === 'male' ? '适合专业技术发展，注重细节' : '理财能力强，适合投资理财',
        '壬': gender === 'male' ? '创意丰富，适合创业' : '社交能力强，人缘极佳',
        '癸': gender === 'male' ? '智慧型发展，适合研究工作' : '感情细腻，追求精神契合'
    };
    return fortunes[stem] || '运势平稳，需要把握机会';
}

// 获取人生建议
function getLifeSuggestions(stem, branch) {
    const suggestions = {
        '甲': '建议培养耐心，学会倾听他人意见，在事业上稳步前进。',
        '乙': '建议增强自信心，适当表现自己，在人际关系中保持独立性。',
        '丙': '建议控制情绪，学会平和思考，在成功时保持谦逊。',
        '丁': '建议加强行动力，将想法付诸实践，在感情中主动表达。',
        '戊': '建议增加灵活性，接受新观念，在稳定中寻求创新。',
        '己': '建议增强决断力，相信自己的判断，适当展现个性。',
        '庚': '建议改善人际关系，学会妥协，在坚持原则时保持弹性。',
        '辛': '建议放松心态，接受不完美，在追求中享受过程。',
        '壬': '建议增强恒心，专注目标，在变化中保持方向。',
        '癸': '建议增强实际能力，平衡理想与现实，在温柔中保持坚强。'
    };
    return suggestions[stem] || '建议保持初心，不断学习和成长。';
}

// 姓名学分析函数
function analyzeName() {
    const name = document.getElementById('chinese-name').value.trim();

    if (!name) {
        alert('请输入中文姓名');
        return;
    }

    const strokes = calculateStrokes(name);
    const totalStrokes = strokes.reduce((sum, stroke) => sum + stroke, 0);
    const wuge = calculateWuge(strokes);
    const analysis = analyzeNamePattern(strokes, wuge);

    const nameResult = document.getElementById('name-result');
    const nameDetails = document.getElementById('name-details');

    nameDetails.innerHTML = `
        <div class="name-analysis">
            <h4>姓名分析：${name}</h4>
            <div class="strokes-info">
                <p><strong>总笔画：</strong>${totalStrokes}</p>
                <p><strong>各字笔画：</strong>${name.split('').map((char, i) => `${char}(${strokes[i]})`).join(' ')}</p>
            </div>
            <div class="wuge-analysis">
                <h5>五格分析：</h5>
                ${wuge.map((item, index) => {
                    const wugeNames = ['天格', '人格', '地格', '外格', '总格'];
                    const wugeMeanings = ['祖运', '主运', '前运', '副运', '后运'];
                    return `<p><strong>${wugeNames[index]}(${wugeMeanings[index]})：</strong>${item}画 - ${getWugeMeaning(item)}</p>`;
                }).join('')}
            </div>
            <div class="sancai-analysis">
                <h5>三才配置：</h5>
                <p>${getSancaiAnalysis(wuge[1], wuge[2], wuge[3])}</p>
            </div>
            <div class="name-advice">
                <h5>姓名建议：</h5>
                <p>${analysis.advice}</p>
            </div>
        </div>
    `;

    nameResult.style.display = 'block';
    nameResult.scrollIntoView({ behavior: 'smooth' });
}

// 计算笔画
function calculateStrokes(name) {
    return name.split('').map(char => strokeData[char] || Math.floor(Math.random() * 10) + 1);
}

// 计算五格
function calculateWuge(strokes) {
    const tianGe = strokes[0] + 1; // 单姓加1，复姓加笔画和
    const renGe = strokes[0] + (strokes[1] || 0);
    const diGe = strokes[1] + (strokes[2] || 0);
    const waiGe = strokes.length >= 3 ? strokes[0] + strokes[2] : 1;
    const zongGe = strokes.reduce((sum, stroke) => sum + stroke, 0);

    return [tianGe, renGe, diGe, waiGe, zongGe];
}

// 获取五格含义
function getWugeMeaning(strokes) {
    const meanings = {
        1: '大吉 - 基础安泰，可得长辈惠泽，但须防意外',
        2: '凶 - 摇动不定，常有风波，处事多苦闷',
        3: '大吉 - 德高望重，事事如意，功成名就',
        4: '凶 - 前途坎坷，苦难不断，多不如意',
        5: '大吉 - 福禄长寿，阴阳和合，心身健全',
        6: '大吉 - 吉祥有幸，但须贵人相助',
        7: '吉 - 独立权威，有权威智谋，但刚愎自用',
        8: '吉 - 意志刚健，勤勉发展，有志竟成',
        9: '凶 - 虽有成功运，但基础不稳，恐有意外',
        10: '凶 - 万事终局，难免衰退，宜退守为安'
    };

    const key = strokes % 10 === 0 ? 10 : strokes % 10;
    return meanings[key] || '需要详细分析';
}

// 获取三才配置分析
function getSancaiAnalysis(ren, di, wai) {
    const renElement = getElementByNumber(ren);
    const diElement = getElementByNumber(di);
    const waiElement = getElementByNumber(wai);

    return `人格属${renElement}，地格属${diElement}，外格属${waiElement}。${getSancaiMeaning(renElement, diElement, waiElement)}`;
}

// 根据数字获取五行
function getElementByNumber(num) {
    const elements = ['金', '木', '水', '火', '土'];
    return elements[(num - 1) % 5];
}

// 获取三才含义
function getSancaiMeaning(ren, di, wai) {
    if (ren === di && di === wai) {
        return '三才相生，配置极佳，成功运佳';
    }
    if ((ren === '木' && di === '火') || (ren === '火' && di === '土') ||
        (ren === '土' && di === '金') || (ren === '金' && di === '水') || (ren === '水' && di === '木')) {
        return '人格生地格，向上发展，获得成功';
    }
    if ((ren === '火' && di === '金') || (ren === '金' && di === '木') ||
        (ren === '木' && di === '土') || (ren === '土' && di === '水') || (ren === '水' && di === '火')) {
        return '人格克地格，虽有压力但能克服';
    }
    return '三才配置平和，需要后天努力';
}

// 分析姓名模式
function analyzeNamePattern(strokes, wuge) {
    const 吉数 = [1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 63, 65, 67, 81];

    const goodCount = wuge.filter(item => 吉数.includes(item)).length;
    const score = (goodCount / wuge.length) * 100;

    let advice = '';
    if (score >= 80) {
        advice = '姓名配置极佳，寓意吉祥，有助于人生发展。';
    } else if (score >= 60) {
        advice = '姓名配置良好，寓意积极，可以继续使用。';
    } else if (score >= 40) {
        advice = '姓名配置一般，建议可以通过改名或使用别字来改善运势。';
    } else {
        advice = '姓名配置需要改善，建议咨询专业命理师进行改名。';
    }

    return { advice, score };
}

// 风水方位计算函数
function calculateFengshui() {
    const birthYear = parseInt(document.getElementById('birth-year').value);
    const gender = document.getElementById('fengshui-gender').value;

    if (!birthYear || birthYear < 1900 || birthYear > 2024) {
        alert('请输入有效的出生年份');
        return;
    }

    const kuaNumber = calculateKuaNumber(birthYear, gender);
    const directions = calculateDirections(kuaNumber);

    const fengshuiResult = document.getElementById('fengshui-result');
    const fengshuiDetails = document.getElementById('fengshui-details');

    fengshuiDetails.innerHTML = `
        <div class="fengshui-analysis">
            <h4>风水方位分析</h4>
            <div class="kua-info">
                <p><strong>您的命卦：</strong>${getKuaName(kuaNumber)}</p>
                <p><strong>命卦数字：</strong>${kuaNumber}</p>
                <p><strong>性别：</strong>${gender === 'male' ? '男命' : '女命'}</p>
                <p><strong>出生年份：</strong>${birthYear}</p>
            </div>
            <div class="directions-analysis">
                <h5>吉凶方位：</h5>
                ${directions.map(dir => `
                    <div class="direction-item ${dir.type}">
                        <strong>${dir.name} (${dir.angle}°)：</strong>
                        <span class="${dir.type}-color">${dir.type} - ${dir.meaning}</span>
                    </div>
                `).join('')}
            </div>
            <div class="fengshui-tips">
                <h5>风水建议：</h5>
                <ul>
                    <li><strong>事业：</strong>办公桌朝向${directions.find(d => d.name === '财位' || d.name === '生气位').name}，有利于事业发展</li>
                    <li><strong>睡眠：</strong>床头朝向${directions.find(d => d.type === '吉' && d.name !== '财位').name}，有助于健康睡眠</li>
                    <li><strong>学习：</strong>书桌朝向${directions.find(d => d.name === '旺位' || d.name === '天医位').name}，提升学习效率</li>
                    <li><strong>装修：</strong>避免将重要家具放置在${directions.find(d => d.type === '凶').name}方向</li>
                </ul>
            </div>
        </div>
    `;

    fengshuiResult.style.display = 'block';
    fengshuiResult.scrollIntoView({ behavior: 'smooth' });
}

// 计算命卦数字
function calculateKuaNumber(year, gender) {
    const lastTwoDigits = year % 100;
    let sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10);

    if (sum >= 10) {
        sum = Math.floor(sum / 10) + (sum % 10);
    }

    if (gender === 'male') {
        return 11 - sum;
    } else {
        return 4 + sum;
    }
}

// 获取命卦名称
function getKuaName(kuaNumber) {
    const kuaNames = {
        1: '坎命',
        2: '坤命',
        3: '震命',
        4: '巽命',
        5: '坤命',
        6: '乾命',
        7: '兑命',
        8: '艮命',
        9: '离命'
    };
    return kuaNames[kuaNumber % 10] || '未知命卦';
}

// 计算方位
function calculateDirections(kuaNumber) {
    const kuaNumberFinal = kuaNumber % 10;
    if (kuaNumberFinal === 5) {
        return calculateFemaleDirections(); // 坤命使用女命方位
    }

    if (kuaNumberFinal === 1 || kuaNumberFinal === 3 || kuaNumberFinal === 4 || kuaNumberFinal === 9) {
        return calculateEastGroupDirections();
    } else {
        return calculateWestGroupDirections();
    }
}

// 东四命方位
function calculateEastGroupDirections() {
    return [
        { name: '财位', angle: 0, type: '吉', meaning: '财运亨通，正财偏财俱佳' },
        { name: '生气位', angle: 45, type: '吉', meaning: '事业顺利，贵人相助' },
        { name: '天医位', angle: 90, type: '吉', meaning: '健康平安，疾病远离' },
        { name: '旺位', angle: 135, type: '吉', meaning: '家庭和睦，事业兴旺' },
        { name: '绝命位', angle: 180, type: '凶', meaning: '官非口舌，破财损利' },
        { name: '五鬼位', angle: 225, type: '凶', meaning: '小人作祟，破财遭灾' },
        { name: '六煞位', angle: 270, type: '凶', meaning: '口舌是非，感情纠葛' },
        { name: '祸害位', angle: 315, type: '凶', meaning: '意外灾害，身体不适' }
    ];
}

// 西四命方位
function calculateWestGroupDirections() {
    return [
        { name: '旺位', angle: 0, type: '吉', meaning: '事业兴旺，名利双收' },
        { name: '天医位', angle: 45, type: '吉', meaning: '健康长寿，祛病延年' },
        { name: '生气位', angle: 90, type: '吉', meaning: '贵人相助，功名显达' },
        { name: '财位', angle: 135, type: '吉', meaning: '财源广进，生意兴隆' },
        { name: '祸害位', angle: 180, type: '凶', meaning: '意外伤害，小心谨慎' },
        { name: '六煞位', angle: 225, type: '凶', meaning: '口舌是非，家庭不和' },
        { name: '五鬼位', angle: 270, type: '凶', meaning: '小人算计，破财招灾' },
        { name: '绝命位', angle: 315, type: '凶', meaning: '大凶之位，避免使用' }
    ];
}

// 女命（坤命）方位
function calculateFemaleDirections() {
    return calculateWestGroupDirections();
}

// 星座运势函数
function getConstellationHoroscope(sign) {
    const constellation = constellationData[sign];
    const horoscope = horoscopeTexts[sign];

    // 更新星座选择状态
    document.querySelectorAll('.zodiac-sign').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`[data-sign="${sign}"]`).classList.add('active');

    const constellationResult = document.getElementById('constellation-result');
    const constellationTitle = document.getElementById('constellation-title');
    const constellationDetails = document.getElementById('constellation-details');

    constellationTitle.textContent = `${constellation.name}运势`;

    constellationDetails.innerHTML = `
        <div class="constellation-info">
            <div class="constellation-header">
                <h4>${constellation.name} (${constellation.dates})</h4>
                <p><strong>属性：</strong>${constellation.element}象星座 | <strong>守护星：</strong>${constellation.ruler}</p>
            </div>
            <div class="horoscope-content">
                <div class="fortune-item">
                    <h5>🌟 整体运势</h5>
                    <p>${horoscope.overall}</p>
                </div>
                <div class="fortune-item">
                    <h5>💕 感情运势</h5>
                    <p>${horoscope.love}</p>
                </div>
                <div class="fortune-item">
                    <h5>💼 事业运势</h5>
                    <p>${horoscope.career}</p>
                </div>
                <div class="fortune-item">
                    <h5>💰 财运分析</h5>
                    <p>${horoscope.wealth}</p>
                </div>
            </div>
            <div class="lucky-info">
                <h5>今日指南</h5>
                <div class="lucky-grid">
                    <div class="lucky-item">
                        <span class="lucky-label">幸运数字：</span>
                        <span class="lucky-value">${getLuckyNumbers(sign)}</span>
                    </div>
                    <div class="lucky-item">
                        <span class="lucky-label">幸运颜色：</span>
                        <span class="lucky-value">${getLuckyColor(sign)}</span>
                    </div>
                    <div class="lucky-item">
                        <span class="lucky-label">贵人星座：</span>
                        <span class="lucky-value">${getLuckyConstellation(sign)}</span>
                    </div>
                    <div class="lucky-item">
                        <span class="lucky-label">开运时间：</span>
                        <span class="lucky-value">${getLuckyTime(sign)}</span>
                    </div>
                </div>
            </div>
            <div class="constellation-advice">
                <h5>今日建议</h5>
                <p>${getDailyAdvice(sign)}</p>
            </div>
        </div>
    `;

    constellationResult.style.display = 'block';
    constellationResult.scrollIntoView({ behavior: 'smooth' });
}

// 获取幸运数字
function getLuckyNumbers(sign) {
    const luckyNumbers = {
        aries: '1, 9',
        taurus: '2, 6',
        gemini: '3, 5, 8',
        cancer: '2, 7',
        leo: '1, 4, 9',
        virgo: '5, 3',
        libra: '6, 9',
        scorpio: '3, 5',
        sagittarius: '3, 9',
        capricorn: '8, 10',
        aquarius: '4, 11',
        pisces: '7, 12'
    };
    return luckyNumbers[sign] || '随机';
}

// 获取幸运颜色
function getLuckyColor(sign) {
    const luckyColors = {
        aries: '红色、橙色',
        taurus: '绿色、粉色',
        gemini: '黄色、银色',
        cancer: '白色、银色',
        leo: '金色、橙色',
        virgo: '灰色、米色',
        libra: '粉色、蓝色',
        scorpio: '深红色、黑色',
        sagittarius: '紫色、蓝绿色',
        capricorn: '棕色、黑色',
        aquarius: '蓝色、银色',
        pisces: '海绿色、淡紫色'
    };
    return luckyColors[sign] || '白色';
}

// 获取贵人星座
function getLuckyConstellation(sign) {
    const luckyConstellations = {
        aries: '狮子座、射手座',
        taurus: '处女座、摩羯座',
        gemini: '水瓶座、天秤座',
        cancer: '天蝎座、双鱼座',
        leo: '白羊座、射手座',
        virgo: '金牛座、摩羯座',
        libra: '双子座、水瓶座',
        scorpio: '巨蟹座、双鱼座',
        sagittarius: '白羊座、狮子座',
        capricorn: '金牛座、处女座',
        aquarius: '双子座、天秤座',
        pisces: '巨蟹座、天蝎座'
    };
    return luckyConstellations[sign] || '任意星座';
}

// 获取开运时间
function getLuckyTime(sign) {
    const luckyTimes = {
        aries: '上午9-11点',
        taurus: '下午3-5点',
        gemini: '中午12-2点',
        cancer: '晚上7-9点',
        leo: '上午10-12点',
        virgo: '早上6-8点',
        libra: '下午2-4点',
        scorpio: '晚上8-10点',
        sagittarius: '下午1-3点',
        capricorn: '早上8-10点',
        aquarius: '下午4-6点',
        pisces: '晚上9-11点'
    };
    return luckyTimes[sign] || '任意时间';
}

// 获取每日建议
function getDailyAdvice(sign) {
    const advices = {
        aries: '今日充满活力，适合挑战新事物。但要注意控制冲动，三思而后行。',
        taurus: '今天适合稳定发展，坚持自己的节奏。在财务方面要谨慎投资。',
        gemini: '沟通运势佳，适合进行重要谈判。但要避免言多必失。',
        cancer: '情感丰富的一天，适合与家人朋友相处。要注意情绪管理。',
        leo: '魅力四射，容易成为焦点。但要避免过于自我，多听取他人意见。',
        virgo: '注重细节的一天，适合处理精细工作。但不要过分追求完美。',
        libra: '人际关系和谐，适合社交活动。但要避免优柔寡断。',
        scorpio: '直觉敏锐，能够洞察真相。但要避免过于神秘，保持开放心态。',
        sagittarius: '冒险精神强，适合尝试新事物。但要制定详细计划。',
        capricorn: '事业运势上升，适合推进工作计划。但要平衡工作与生活。',
        aquarius: '创新思维活跃，适合进行创造性工作。但要注重实际执行。',
        pisces: '灵感丰富，适合艺术创作。但要理性分析，避免情感决策。'
    };
    return advices[sign] || '保持积极心态，把握机会。';
}

// 页面滚动函数
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // 添加输入框焦点效果
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // 添加结果面板关闭功能（可选）
    document.querySelectorAll('.result-panel').forEach(panel => {
        // 可以添加关闭按钮功能
    });
});

// 导出函数供HTML调用
window.calculateBazi = calculateBazi;
window.analyzeName = analyzeName;
window.calculateFengshui = calculateFengshui;
window.getConstellationHoroscope = getConstellationHoroscope;
window.scrollToSection = scrollToSection;