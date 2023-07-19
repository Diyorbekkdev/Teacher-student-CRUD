const DashboardPage = () => {
  return (
    <div className="main_text">
      <h1 className="title">Created By Diyorbek Juraev</h1>
      <p><span className="green">Teacher Management:</span> The app allows you to view, add, edit, and delete
      teacher records. Each teacher record typically includes details such as
      first name, last name, image/avatar, groups, marital status, phone number,
      and email. </p>

      <p><span className="green">Student Management:</span> The app also provides functionality for
      managing students. You can view a list of students associated with each
      teacher, add new students, edit existing student records, and delete
      students. </p>
      <p><span className="green">Filtering:</span> The app offers filtering options, allowing you to
      filter teachers or students based on specific criteria. For example, you
      can filter teachers by their marital status or students by their group.</p>

      <p><span className="green">Sorting:</span> The app supports sorting of teacher and student records based on
      different attributes. You can sort teachers alphabetically by their names
      or students based on specific fields such as first name, last name, or
      group.</p> 
      <p><span className="green">Pagination</span> To handle large datasets, the app incorporates
      pagination, dividing the list of teachers or students into manageable
      pages. This ensures smooth performance and efficient navigation.</p>

      <p><span className="green">Searching:</span> The app includes a search functionality that allows you to
      search for specific teachers or students by name. As you type in the
      search box, the app dynamically filters the results based on the entered
      text.</p>
    </div>
  );
};

export default DashboardPage;
