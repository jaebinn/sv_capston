// controller/qnaController.js

const { Question, Comment } = require('../models/qna');

const ExpressError = require('../utils/ExpressError');
require('dotenv').config()


// ** 게시판 페이징 알고리즘 함수 **
const hasPrev = (startPage) => {
    return (startPage == 1) ? false : true;
}

const hasNext = (endPage, totalPages) => {
    return (endPage == totalPages) ? false : true;
}

const getTotalPages = (totalPost, postPerPage) => {
    return parseInt((totalPost - 1) / postPerPage) + 1;
}

const getStartPage = (currentPage, displayPageNum) => {
    return parseInt((currentPage - 1) / displayPageNum) * displayPageNum + 1;
}

const getEndPage = (currentPage, displayPageNum, totalPages) => {
    let endPage = (parseInt((currentPage - 1) / displayPageNum) + 1) * displayPageNum;

    if (totalPages < endPage) endPage = totalPages;
    return endPage;
}

module.exports = {

    // 게시판 목록
    index: async (req, res) => {

        const page = parseInt(req.query.page) || 1;
        const postPerPage = 10;
        const displayPageNum = 10;
        const totalPosts = await Question.countAll();

        const totalPages = getTotalPages(totalPosts[0].total, postPerPage);
        const startPage = getStartPage(page, displayPageNum);
        const endPage = getEndPage(page, displayPageNum, totalPages);

        const prev = hasPrev(startPage);
        const next = hasNext(endPage, totalPages);

        const offset = (page - 1) * postPerPage;
        const data = [offset, postPerPage];

        const indexPosts = await Question.findByPage(data);
        res.render('question/index', { indexPosts, prev, next, startPage, endPage, currentPage: page });
    },
    // 게시글 작성 페이지 
    new: (req, res) => {
        res.render('question/new');
    },

    // 게시글 작성 요청 
    create: (req, res, next) => {

        if (res.locals.loggedIn) {
            const newQuestion= new Question(req.body, res.locals.currentUser);
            const { isAnonymous } = req.body;

        
            if (isAnonymous === "true") {
                newBoard.author = "익명";
            }
            let img;

            const { user_id, author, title, content, date, count } = newQuestion;

            // 이미지 저장시 또는 저장하지 않을때 
            if (req.file) {
                img = req.file.path;
            }
            else {
                img = null;
            }

            // 게시글 저장시 아무것도 입력되지 않을때, 다시 입력
            const data = [user_id, author, title, content, img, date, count];
            if (title === '' || content === '') {
                req.flash('error', "내용을 비우지 말아주세요");
                res.redirect('/qna/new');
            }
            else {
                Question.create(data)
                    .then(id => {
                        if (id) {
                            res.redirect(`/qna/${id}`);
                        }
                        else {
                            next(new ExpressError('게시글 작성 오류 발생', 500));
                        }
                    });
            }
        }

        else {
            next(new ExpressError('로그인을 하시고 글을 쓸 수 있습니다.', 500));
        }
    },

    // 단일 게시물 보기 
    show: async (req, res, next) => {

        const id = parseInt(req.params.id);
        const qna = await Question.findById(id);
        const comments = await Comment.findCommentById(id);
        // 게시글이 존재하지 않을때
        if (qna.length === 0) {
            next(new ExpressError('존재하지 않는 게시글입니다.', 404));
        }
        else {
            res.render('question/show', { qna: qna[0], comments });
        }
    },

    // 게시글 수정페이지  
    edit: async (req, res, next) => {

        const id = parseInt(req.params.id);
        // 로그인 & 사용자가 맞을때 접근 가능 
        const qna = await Question.findById(id);
        if (res.locals.loggedIn && res.locals.currentUser.user_id === qna[0].user_id) {
            res.render('question/edit', { qna: qna[0] });
        }
        else if (qna.length === 0) {
            next(new ExpressError('존재하지 않는 게시글입니다.', 404));

        }
        else {
            next(new ExpressError('접근 권한이 없습니다.', 500));
        }
    },

    // 게시글 수정하기
    update: async (req, res) => {

        if (res.locals.loggedIn) {
            const newBoard = new Question(req.body, res.locals.currentUser);
            const { isAnonymous } = req.body;
            const post_id = req.params.id;

            if (isAnonymous === "true") {
                newBoard.author = "익명";
            }
            let img;
            const { author, title, content, date } = newBoard;
            // 이미지 저장시 또는 저장하지 않을때 
            if (req.file) {
                img = req.file.path;
            }
            else {
                img = null;
            }

            // 게시글 저장시 아무것도 입력되지 않을때, 다시 입력
            const data = [author, title, content, date, img, post_id];
            // 내용을 작성하지 않을때 
            if (title === '' || content === '') {
                req.flash('error', "내용을 비우지 말아주세요");
                res.redirect(`/qna/${post_id}/edit`);
            }
            else {
                Question.updateBoard(data)
                    .then(result => {
                        if (result) {
                            res.redirect(`/qna/${post_id}`);
                        }
                        else {
                            next(new ExpressError('게시글 수정 오류 발생', 500));
                        }
                    })
            }
        }
        else {
            next(new ExpressError('로그인을 하시고 글을 수정할 수 있습니다.', 500));
        }

    },

    // 게시글 삭제 요청
    delete: async (req, res) => {
        const { id } = req.params;
        const qna = await Question.findById(id);
        if (res.locals.loggedIn && res.locals.currentUser.user_id === qna[0].user_id) {
            Question.deleteById(id)
                .then(result => {
                    if (result) {
                        req.flash('success', '게시글이 삭제되었습니다.');
                        res.redirect(`/qna`);
                    }
                    else {
                        next(new ExpressError('게시글 삭제 오류 발생', 500));
                    }
                })
        }
        else {
            next(new ExpressError('잘못된 접근입니다.', 500))
        }
    },

    // 게시글 댓글 작성 
    createComment: async (req, res, next) => {
        if (res.locals.loggedIn) {
            const { id } = req.params;
            const newComment = new Comment(req.body, id, res.locals.currentUser);
            const { post_id, user_id, author, content, date } = newComment;
            const data = [post_id, user_id, author, content, date];
            Comment.create(data)
                .then(result => {
                    req.flash('success', '댓글 작성 완료!');
                    res.redirect(`/qna/${id}`);
                })
                .catch(err => {
                    next(new ExpressError('잘못된 접근입니다.', 500));
                })
        }
        else {
            next(new ExpressError('잘못된 접근입니다.', 500));
        }

    },

    // 게시글 댓글 수정 
    updateComment: async (req, res, next) => {
        if (res.locals.loggedIn) {
            const { id, comment_id } = req.params;
            const newComment = new Comment(req.body, id, res.locals.currentUser);
            const { content, date, user_id } = newComment;
            const data = [content, date, parseInt(comment_id), user_id];
            
            Comment.updateComment(data)
                .then(result => {
                    if (result.length > 0) {
                        req.flash('error', '댓글을 수정하는데 실패했습니다.');
                        res.redirect(`/qna/${id}`);
                    }
                    else {
                        req.flash('success', '댓글 수정 완료!');
                        res.redirect(`/qna/${id}`);
                    }

                })
                .catch(err => {
                    next(new ExpressError('에러가 발생했습니다.', 500));
                })
        }
        else {
            next(new ExpressError('잘못된 접근입니다.', 500));
        }
    },

    deleteComment: async (req, res) => {
        if (res.locals.loggedIn) {
            const id = parseInt(req.params.id);
            const comment_id = parseInt(req.params.comment_id);
            const { user_id } = res.locals.currentUser;
            const data = [comment_id, user_id];
           

            Comment.deleteComment(data)
                .then(result => {
                    if (result.length === undefined) {
                        req.flash('success', '댓글 삭제 완료!');
                        res.redirect(`/qna/${id}`);
                    }
                    else {
                        req.flash('error', '댓글을 삭제하는데 실패했습니다.');
                        res.redirect(`/qna/${id}`);
                    }
                })
                .catch(err => {
                    next(new ExpressError('에러가 발생했습니다.', 500));
                })
        }

        else {
            next(new ExpressError('잘못된 접근입니다', 500));
        }
    }

}
