# Question

The page has a **Department** dropdown that already lists three departments, an empty **Employee** dropdown, a button labelled **Show**, and an empty `<div>` that will display the result.

You are given a data object in the starter JavaScript that maps each department name to an array of employee objects. Each employee object has an `id` and a `name`:

```javascript
const DEPARTMENTS = {
  Engineering: [
    { id: 'eng-001', name: 'Aisha' },
    { id: 'eng-002', name: 'Ben' },
    { id: 'eng-003', name: 'Carla' },
  ],
  Design: [
    { id: 'des-001', name: 'Diana' },
    { id: 'des-002', name: 'Evan' },
  ],
  Sales: [
    { id: 'sal-001', name: 'Farah' },
    { id: 'sal-002', name: 'Gabe' },
    { id: 'sal-003', name: 'Hana' },
  ],
};
```

Behavior:

1. When the user picks a department from the Department dropdown, the Employee dropdown should be populated with that department's employees. Each employee option should display the employee's **name**, and its `value` should be the employee's **id**.
2. If the user changes the department, the Employee dropdown should be re-populated with the employees of the newly chosen department (any previous options should be removed).
3. When the user clicks the **Show** button, the result `<div>` should display the **id** and **name** of the currently selected employee in the format `id: name`. For example, if Aisha is selected, the result should be:

   ```
   eng-001: Aisha
   ```

When the page first loads, no department is selected and the Employee dropdown is empty (apart from the placeholder).

# Test Cases

```
describe('form processing revision - department employees', () => {
  const department = () => document.querySelector('#department');
  const employee = () => document.querySelector('#employee');
  const result = () => document.querySelector('#result');

  const selectDepartment = (value) => {
    const sel = department();
    sel.value = value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const selectEmployee = (id) => {
    employee().value = id;
  };
  const click = () => document.querySelector('#show-btn').click();

  it('populates employees for Engineering', () => {
    selectDepartment('Engineering');
    const opts = [...employee().querySelectorAll('option')].filter((o) => o.value !== '');
    expect(opts.length).to.equal(3);
    const ids = opts.map((o) => o.value);
    const names = opts.map((o) => o.textContent.trim());
    expect(ids).to.include.members(['eng-001', 'eng-002', 'eng-003']);
    expect(names).to.include.members(['Aisha', 'Ben', 'Carla']);
  });

  it('repopulates employees when department changes', () => {
    selectDepartment('Engineering');
    selectDepartment('Design');
    const opts = [...employee().querySelectorAll('option')].filter((o) => o.value !== '');
    expect(opts.length).to.equal(2);
    const ids = opts.map((o) => o.value);
    expect(ids).to.include.members(['des-001', 'des-002']);
    expect(ids).to.not.include('eng-001');
  });

  it('shows id: name for the selected employee', () => {
    selectDepartment('Sales');
    selectEmployee('sal-002');
    click();
    expect(result().textContent.trim()).to.equal('sal-002: Gabe');
  });

  it('shows the right employee after switching departments', () => {
    selectDepartment('Engineering');
    selectDepartment('Sales');
    selectEmployee('sal-003');
    click();
    expect(result().textContent.trim()).to.equal('sal-003: Hana');
  });
});
```

# Starting Files

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Department Employees</title>
  </head>
  <body>
    <label>
      Department:
      <select id="department">
        <option value="">-- choose a department --</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="Sales">Sales</option>
      </select>
    </label>

    <label>
      Employee:
      <select id="employee">
        <option value="">-- choose an employee --</option>
      </select>
    </label>

    <button id="show-btn">Show</button>
    <div id="result"></div>
    <script src="script.js"></script>
  </body>
</html>
```

## CSS

```css
body {
  font-family: sans-serif;
  padding: 20px;
}
label {
  display: inline-block;
  margin-right: 15px;
}
select, button {
  font-size: 16px;
  padding: 5px 10px;
}
#result {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}
```

## JavaScript

```javascript
const DEPARTMENTS = {
  Engineering: [
    { id: 'eng-001', name: 'Aisha' },
    { id: 'eng-002', name: 'Ben' },
    { id: 'eng-003', name: 'Carla' },
  ],
  Design: [
    { id: 'des-001', name: 'Diana' },
    { id: 'des-002', name: 'Evan' },
  ],
  Sales: [
    { id: 'sal-001', name: 'Farah' },
    { id: 'sal-002', name: 'Gabe' },
    { id: 'sal-003', name: 'Hana' },
  ],
};

// Write your code here
```

## Hints

- Build a new `<option>` element with `document.createElement('option')`. Set its `.value` and `.textContent`, then append it to the Employee dropdown.
- Before adding new options, clear the old ones. The simplest way is `employeeSelect.innerHTML = '<option value="">-- choose an employee --</option>'`.
- Use `Array.prototype.find` on the department's array to look up the employee object by id when the **Show** button is clicked.

# Solution

```javascript
const DEPARTMENTS = {
  Engineering: [
    { id: 'eng-001', name: 'Aisha' },
    { id: 'eng-002', name: 'Ben' },
    { id: 'eng-003', name: 'Carla' },
  ],
  Design: [
    { id: 'des-001', name: 'Diana' },
    { id: 'des-002', name: 'Evan' },
  ],
  Sales: [
    { id: 'sal-001', name: 'Farah' },
    { id: 'sal-002', name: 'Gabe' },
    { id: 'sal-003', name: 'Hana' },
  ],
};

const departmentSelect = document.querySelector('#department');
const employeeSelect = document.querySelector('#employee');
const showBtn = document.querySelector('#show-btn');
const resultDiv = document.querySelector('#result');

departmentSelect.addEventListener('change', () => {
  const department = departmentSelect.value;
  employeeSelect.innerHTML = '<option value="">-- choose an employee --</option>';

  const employees = DEPARTMENTS[department] || [];
  employees.forEach((emp) => {
    const option = document.createElement('option');
    option.value = emp.id;
    option.textContent = emp.name;
    employeeSelect.appendChild(option);
  });
});

showBtn.addEventListener('click', () => {
  const department = departmentSelect.value;
  const employeeId = employeeSelect.value;
  const employees = DEPARTMENTS[department] || [];
  const employee = employees.find((e) => e.id === employeeId);
  if (employee) {
    resultDiv.textContent = employee.id + ': ' + employee.name;
  }
});
```

# Walkthrough

1. Get references to the Department `<select>`, the Employee `<select>`, the **Show** button, and the result `<div>`.
2. Listen for the `change` event on the Department dropdown:
   - Read the selected department value.
   - Clear the Employee dropdown and re-add the placeholder option.
   - Look up the matching employees array in `DEPARTMENTS[department]`.
   - For each employee, create an `<option>` element, set its `value` to `emp.id` and its `textContent` to `emp.name`, then append it to the Employee dropdown.
3. Listen for the `click` event on the **Show** button:
   - Read the currently selected department and employee id.
   - Use `Array.find` to locate the employee object whose `id` matches.
   - Set the result `<div>`'s `textContent` to `employee.id + ': ' + employee.name`.
4. Switching the department re-runs the `change` handler, so old employees are wiped before new ones are added.
