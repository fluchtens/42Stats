async function getApiToken() {
  try {
    const response = await fetch("https://api.intra.42.fr/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id:
          "u-s4t2ud-1bf3f54d118b8dd7945782afe2fd2e7058c7e17f4f51a12230a433b071054ac2",
        client_secret:
          "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",
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to retrieve API access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("getApiToken", error);
    return null;
  }
}

async function getCampus(
  token: string,
  page: number = 1,
  perPage: number = 100
): Promise<Campus[] | null> {
  try {
    const response = await fetch(
      `https://api.intra.42.fr/v2/campus?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to retrieve campus data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getCampus()", error);
    return null;
  }
}

interface Campus {
  id: number;
  name: string;
}

export default async function Home() {
  const token = await getApiToken();

  const perPage = 100;

  let page = 1;
  let allCampus: Campus[] = [];
  let campusPage = await getCampus(token, page, perPage);
  while (campusPage && campusPage.length > 0) {
    allCampus = [...allCampus, ...campusPage];
    page++;
    campusPage = await getCampus(token, page, perPage);
  }

  const campusMap = new Map();
  allCampus.forEach((campus: Campus) => {
    const { id, name } = campus;
    campusMap.set(id, name);
  });

  return (
    <main className="">
      <h1>42stats</h1>
      {campusMap.size > 0 && (
        <div>
          <h2>Liste des campus :</h2>
          <ul>
            {Array.from(campusMap)
              .sort(([idA], [idB]) => idA - idB)
              .map(([id, name]) => (
                <li key={id}>
                  {id}. {name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </main>
  );
}
