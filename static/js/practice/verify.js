$(function() {
            $("#submitBtn").click(function() {
                var questionId = $('INPUT[id=questionId]').val();
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
            });

        });