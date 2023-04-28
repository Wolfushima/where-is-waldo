import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collectionGroup, getFirestore, getDocs } from 'firebase/firestore';
import firebaseApp from './firebase-config';

const firestoreDatabase = getFirestore(firebaseApp);

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Firestore'],
  endpoints: (builder) => ({
    fetchLevelCharacters: builder.query({
      async queryFn(level = 'LEVEL1') {
        try {
          const ref = collectionGroup(firestoreDatabase, `CHARACTERS_${level}`);
          const querySnapshot = await getDocs(ref);
          const characters = [];
          querySnapshot?.forEach((doc) => {
            characters.push(doc.data());
          });
          return { data: characters };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Firestore'],
    }),
  }),
});

export const { useFetchLevelCharactersQuery } = firestoreApi;
