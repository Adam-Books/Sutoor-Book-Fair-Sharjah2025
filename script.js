let books = [];

$(document).ready(function(){
    // إخفاء عداد نتائج البحث افتراضيًا
    $('#resultCount').hide();

    // تحميل بيانات JSON
    $.getJSON('books.json', function(data){
        books = data;
        displayBooks(books);
    });

    // البحث الفوري
    $('#search').on('input', function(){
        const query = $(this).val().trim();
        const filtered = books.filter(book => searchMatch(book, query));
        displayBooks(filtered);

        if(filtered.length > 0 || query !== "") {
            $('#resultCount').text(`عدد نتائج البحث: ${filtered.length}`).show();
        } else {
            $('#resultCount').hide();
        }
    });
});


// دالة لتصفية البحث مع معالجة الهمزة
function searchMatch(book, query){
    if(!query) return true;
    const normalize = str => str.replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').toLowerCase();
    query = normalize(query);
    return Object.values(book).some(val => normalize(val.toString()).includes(query));
}

// دالة عرض البيانات في الجدول
function displayBooks(data){
    const tbody = $('#booksTable tbody');
    tbody.empty();
    data.forEach(book => {
        tbody.append(`<tr>
            <td>${book['م']}</td>
            <td>${book['اسم الكتاب']}</td>
            <td>${book['اسم المؤلف']}</td>
            <td>${book['اسم المحقق']}</td>
            <td>${book['دار النشر']}</td>
            <td>${book['سنة النشر']}</td>
            <td>${book['سعر البيع']}</td>
        </tr>`);
    });
}
