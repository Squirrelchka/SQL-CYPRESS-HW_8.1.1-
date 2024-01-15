describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    ); //помещаем (название эвента из конфига, sql скрипт(табл студентов с полями разными))
  });
  it("input entries", () => {
    cy.task(
      "queryDb",
      'INSERT INTO Students(StudentID, FirstName, StudentGroup, City) VALUES (1, "Ivan", "02-2022", "London"), (2, "Maria", "03-2022", "Tokio"), (3, "Olga", "02-2023", "Milan");'
    ).then((result) =>{ //тут проверяем результат и что добавлено 3 строки
        cy.log(JSON.stringify(result));
        expect(result.affectedRows).to.equal(3);
    });
  });
  it("add students", () => {
    cy.task(
      "queryDb",
      'INSERT INTO Students(StudentID, FirstName, StudentGroup, City) VALUES (4, "Misha", "03-2022", "London"), (5, "Konstantin", "03-2022", "Tokio");'
    ).then((result) =>{ //тут проверяем результат и что добавлено 3 строки
        cy.log(JSON.stringify(result));
        expect(result.affectedRows).to.equal(2);
    });
  });
  it('select students from 03-2022 group', () => {
    cy.task("queryDb", `SELECT FirstName FROM Students WHERE StudentGroup="03-2022"`)
    .then((result) => {
        cy.log(JSON.stringify(result)); 
        expect(result[0].FirstName).to.equal("Maria", "Misha", "Konstantin"); //указываем массив
    })
  });
  it('select', () => {
    cy.task("queryDb", `SELECT FirstName FROM Students WHERE City="London"`)
    .then((result) => {
        cy.log(JSON.stringify(result)); 
        expect(result[0].FirstName).to.equal("Ivan"); 
    })
  });
  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
