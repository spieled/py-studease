seajs.use(['widget', '$', 'bootstrap'], function (Widget, $) {
    $(function() {

        Widget.autoRenderAll();

            function handleRadio(questionId) {
                var answerId = $('INPUT[type=radio][name=answerId]:checked').val();
                $.ajax({
                    url: '/practice/verify/' + questionId + '/' + answerId + '/',
                    success: function(responseText) {
                        var json = $.parseJSON(responseText);
                        var extra = '正确答案是：' ;
                        var correct_answers = json.correct_answers || [];
                        $.each(correct_answers, function(index, item) {
                            var tag = $('INPUT[type=radio][name=answerId][value='+item+']').attr("tag");
                            if (index > 0) {
                                tag = "," + tag;
                            }
                            extra += tag
                        });

                        $("#tipModel").find('SPAN[id=tipText]').text(json.msg + extra);
                        $("#tipModel").modal();
                    }
                });

            }

            function handleCheckBox(questionId) {

                var answers = '';
                var checkeds = $('INPUT[type=checkbox][name=answerId]:checked');
                $.each(checkeds, function(index, item) {
                    if (index > 0) {
                        answers += ",";
                    }
                    answers += $(item).val();
                });
                console.log("answers: " + answers);
                $.ajax({
                    url: '/practice/multi-verify/' + questionId + '/' + answers + '/',
                    success: function(responseText) {
                        var json = $.parseJSON(responseText);
                        var extra = '正确答案是：' ;
                        var correct_answers = json.correct_answers || [];
                        $.each(correct_answers, function(index, item) {
                            var tag = $('INPUT[type=checkbox][name=answerId][value='+item+']').attr("tag");
                            if (index > 0) {
                                tag = "," + tag;
                            }
                            extra += tag
                        });

                        $("#tipModel").find('SPAN[id=tipText]').text(json.msg + extra);
                        $("#tipModel").modal();
                    }
                });

            }

            $("#submitBtn").click(function() {
                var questionId = $('INPUT[id=questionId]').val();
                var multi_answer = $('INPUT[id=questionId]').attr("multi-answer");

                if (multi_answer == "true") {
                    handleCheckBox(questionId);
                } else {
                    handleRadio(questionId);
                }

            });

        });
});
