$(function() {
            $("#submitBtn").click(function() {
                var questionId = $('INPUT[id=questionId]').val();
                var answerId = $('INPUT[type=radio][name=answerId]:checked').val();
                $.ajax({
                    url: '/practice/verify/' + questionId + '/' + answerId + '/',
                    success: function(responseText) {
                        var json = $.parseJSON(responseText);
                        var extra = '正确答案是：' ;
                        var correct_answers = json.correct_answers || '';
                        extra += correct_answers;

                        $("#tipModel").find('SPAN[id=tipText]').text(json.msg + extra);
                        $("#tipModel").modal();
                    }
                });
            });

        });