// AI Customer Sentiment Analyzer Script
document.addEventListener("DOMContentLoaded", function () {

    const feedbackInput = document.getElementById("feedback");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const resultBox = document.getElementById("resultBox");
    const sentimentSpan = document.getElementById("sentiment");
    const explanationSpan = document.getElementById("explanation");
    const errorMsg = document.getElementById("error");
    const themeColorInput = document.getElementById("themeColor");

    const GEMINI_API_KEY = "AIzaSyA4TI0hNCDqCze5hSw4BpHCLo0AojlVSOQ"; 
    const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    function setThemeColor(hex) {
        const root = document.documentElement;
        const darken = (color, amount) => {
            let c = color.replace('#', '');
            if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
            const num = parseInt(c, 16);
            let r = Math.min(255, Math.max(0, (num >> 16) + amount));
            let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
            let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        };

        root.style.setProperty('--color-primary', hex);
        root.style.setProperty('--color-secondary', darken(hex, -35));
    }

    themeColorInput.addEventListener('input', function () {
        setThemeColor(this.value);
    });

    // Thiết lập màu mặc định ngay lần đầu
    setThemeColor(themeColorInput.value);

    async function analyzeSentiment(text) {
        try {
            // Gemini truyền Key qua URL parameter ?key=
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Phân tích cảm xúc của phản hồi khách hàng sau và chỉ trả về duy nhất định dạng JSON như sau:
{"sentiment":"Positive|Negative|Neutral","explanation":"giải thích ngắn bằng tiếng Việt"}

Phản hồi: ${text}`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error("API error");
            }

            const data = await response.json();
            
            // Cấu trúc nhận kết quả từ Gemini
            let content = data.candidates[0].content.parts[0].text.trim();
            
            // Loại bỏ ký tự thừa nếu AI trả về định dạng Markdown (```json ... ```)
            content = content.replace(/```json|```/g, "").trim();
            
            const result = JSON.parse(content);

            return formatResult(result.sentiment, result.explanation);

        } catch (error) {
            console.warn("API lỗi → chuyển sang chế độ DEMO", error);
            return demoSentiment(text);
        }
    }
    function isEvaluableText(text) {
        const lower = text.toLowerCase();

        // Những từ/cụm từ thể hiện ý đánh giá
        const terms = [
            // Tích cực
            "ok", "okie", "okê", "ổn", "ổn áp", "ổn phết", "ổn rồi", "tốt", "rất tốt", "tuyệt", "tuyệt vời", "đỉnh", "xuất sắc", "hoàn hảo", "hài lòng", "yêu thích", "đẹp", "ngon", "chuẩn", "ấn tượng", "thỏa mãn", "ưng ý", "nhanh", "nhẹ nhàng", "êm", "đáng tiền", "ổn định",
            // Trung tính
            "bình thường", "tạm", "tạm được", "cũng được", "ổn thôi", "chẳng sao", "thường", "bình thường thôi", "tạm ok", "tạm ổn",
            // Tiêu cực
            "tệ", "rất tệ", "xấu", "quá xấu", "kém", "chán", "không ok", "không ổn", "không tốt", "hỏng", "lỗi", "thất vọng", "tồi", "bực", "ức chế", "bực mình", "phiền", "khó chịu", "chậm", "bất tiện", "khó dùng", "không đáng", "làm phiền", "dở", "nát", "kinh khủng", "cực kỳ tệ", "hết hồn", "rắc rối", "rườm rà"
        ];

        return terms.some((term) => lower.includes(term));
    }

    function demoSentiment(text) {
        const lower = text.toLowerCase();
        const positiveTerms = [
            "ok", "okie", "okê", "ổn", "ổn áp", "ổn phết", "ổn rồi", "tốt", "rất tốt", "tuyệt", "tuyệt vời", "đỉnh", "xuất sắc", "hoàn hảo", "hài lòng", "yêu thích", "đẹp", "ngon", "chuẩn", "ấn tượng", "thỏa mãn", "ưng ý", "nhanh", "nhẹ nhàng", "êm", "ổn định", "đáng tiền"
        ];
        const neutralTerms = [
            "bình thường", "tạm", "tạm được", "cũng được", "ổn thôi", "chẳng sao", "thường", "bình thường thôi", "tạm ok", "tạm ổn"
        ];
        const negativeTerms = [
            "tệ", "rất tệ", "xấu", "quá xấu", "kém", "chán", "không ok", "không ổn", "không tốt", "hỏng", "lỗi", "thất vọng", "tồi", "bực", "ức chế", "bực mình", "phiền", "khó chịu", "chậm", "bất tiện", "khó dùng", "không đáng", "làm phiền", "dở", "nát", "kinh khủng", "cực kỳ tệ", "hết hồn", "rắc rối", "rườm rà"
        ];

        let sentiment = "Neutral";
        let explanation = "Không xác định rõ cảm xúc.";

        const hasPositive = positiveTerms.some((term) => lower.includes(term));
        const hasNegative = negativeTerms.some((term) => lower.includes(term));
        const hasNeutral = neutralTerms.some((term) => lower.includes(term));

        if (hasPositive && hasNegative) {
            sentiment = "Mixed";
            explanation = "Phản hồi có cả ý tích cực và tiêu cực (ví dụ: tốt nhưng giao hàng chậm).";
        } else if (hasPositive) {
            sentiment = "Positive";
            explanation = "Phản hồi có chứa từ ngữ tích cực.";
        } else if (hasNegative) {
            sentiment = "Negative";
            explanation = "Phản hồi có chứa từ ngữ tiêu cực.";
        } else if (hasNeutral) {
            explanation = "Phản hồi có chứa từ ngữ trung tính.";
        }

        return formatResult(sentiment, explanation);
    }

    function formatResult(sentiment, explanation) {
        let sentimentClass = "neutral";
        let sentimentText = "😐 Trung tính";

        if (sentiment === "Positive") {
            sentimentClass = "positive";
            sentimentText = "😊 Tích cực";
        }
        if (sentiment === "Negative") {
            sentimentClass = "negative";
            sentimentText = "😡 Tiêu cực";
        }
        if (sentiment === "Mixed") {
            sentimentClass = "mixed";
            sentimentText = "🤔 Hỗn hợp";
        }

        return {
            sentiment: sentimentText,
            explanation: explanation,
            class: sentimentClass
        };
    }

    analyzeBtn.addEventListener("click", async function () {
        const feedback = feedbackInput.value.trim();

        if (!feedback) {
            showError("Vui lòng nhập phản hồi của khách hàng.");
            return;
        }

        if (!isEvaluableText(feedback)) {
            showError("Vui lòng nhập phản hồi liên quan đến sản phẩm/dịch vụ (ví dụ: tốt, tệ, ok, không hài lòng...).");
            return;
        }

        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = "🤖 AI đang phân tích...";
        errorMsg.textContent = "";
        resultBox.classList.add("hidden");

        try {
            const result = await analyzeSentiment(feedback);
            sentimentSpan.textContent = result.sentiment;
            explanationSpan.textContent = result.explanation;
            resultBox.className = `result-box ${result.class}`;
            resultBox.classList.remove("hidden");
        } catch (error) {
            showError("Không thể phân tích cảm xúc.");
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = "Phân tích cảm xúc";
        }
    });

    function showError(message) {
        alert(message);
        errorMsg.textContent = message;
        resultBox.classList.add("hidden");
        feedbackInput.focus();
        feedbackInput.select();
    }

    feedbackInput.addEventListener("input", function () {
        errorMsg.textContent = "";
    });
});
