import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LOAD_PEOPLE } from "../redux/reducers/people/actions";
import { selectPeople } from "../redux/reducers/people/selectors";
import PeopleTablePagination from "./PeopleTablePagination";

export default function PeopleTable() {
  const people = useSelector(selectPeople);
  const dispatch = useDispatch();

  const changePage = (newPage) =>
    dispatch({
      type: LOAD_PEOPLE,
      payload: {
        page: newPage,
        search: people.search,
      },
    });

  const search = (e) =>
    dispatch({
      type: LOAD_PEOPLE,
      payload: {
        page: 1,
        search: e.target.value,
      },
    });

  return (
    <>
      <h1>
        Star Wars People
        <form style={{ display: "inline-block" }}>
          <input
            style={{ padding: "12px 20px" }}
            type="text"
            value={people.search}
            placeholder="Search people..."
            onChange={search}
          />
        </form>
      </h1>
      {people.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table border="1" width="100%" cellSpacing="0" cellPadding="2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth year</th>
                <th>Eye color</th>
                <th>Gender</th>
                <th>Hair color</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              {people?.data?.results.map((character) => {
                return (
                  <tr key={character.name}>
                    <td>{character.name}</td>
                    <td>{character.birth_year}</td>
                    <td>{character.eye_color}</td>
                    <td>{character.gender}</td>
                    <td>{character.hair_color}</td>
                    <td>{character.height}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PeopleTablePagination
            page={people.page}
            total={people.data.count}
            onChange={changePage}
          />
        </>
      )}
    </>
  );
}
