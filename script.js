$(document).ready(function () {
    var courses = []; // Array to store courses
    var counter = 1; // Counter to assign IDs to courses

    // Event listener for the form submission
    $('#add-course-form').on('submit', function (e) {
        e.preventDefault();
        var courseName = $('#course-name').val(); // Get the value of the course name input
        var courseDescription = $('#course-description').val(); // Get the value of the course description input
        courses.push({ id: counter, name: courseName, description: courseDescription }); // Add the new course object to the courses array
        counter++; // Increment the counter for the next course
        renderCoursesTable(); // Render the updated courses table
    });

    // Function to render the courses table
    function renderCoursesTable() {
        $('#courses-table tbody').empty(); // Clear the table body
        courses.forEach(function (course) {
            // Append a new row to the table for each course
            $('#courses-table tbody').append(
                '<tr><th scope="row">' + course.id +
                '</th><td>' + course.name +
                '</td><td>' + course.description +
                '</td><td><button class="btn btn-danger delete-course" data-id="' + course.id + '">Delete</button></td></tr>'
            );
        });
        $('.delete-course').on('click', function () {
            var courseId = $(this).data('id'); // Get the ID of the course to delete from the button's data attribute
            courses = courses.filter(function (course) {
                return course.id !== courseId; // Remove the course with the matching ID from the courses array
            });
            renderCoursesTable(); // Render the updated courses table after deletion
        });
    }

    // Event listener for the sort select dropdown
    $('#sort-select').on('change', function () {
        var sortValue = $(this).val(); // Get the selected sort value
        courses.sort(function (a, b) {
            return a[sortValue].localeCompare(b[sortValue]); // Sort the courses array based on the selected value (name or description)
        });
        renderCoursesTable(); // Render the sorted courses table
    });
});
