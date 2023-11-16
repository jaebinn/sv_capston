// controller/testController.js

// 테스트(대화연습) 컨트롤러

module.exports = {

    basic: (req, res) => {
        res.render('test/basic');
    },
    basicStart: (req, res) => {
        res.render('test/basicTest');
    },

    middle: (req, res) => {
        res.render('test/middle');
    },
    middleStart: (req, res) => {
        res.render('test/middleTest');
    },

    advanced: (req, res) => {
        res.render('test/advanced');
    },
    advancedStart: (req, res) => {
        res.render('test/advancedTest');
    }

}