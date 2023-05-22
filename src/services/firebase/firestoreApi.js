import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collectionGroup,
  getFirestore,
  getDocs,
  addDoc,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
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
    updateLevelLeaderboard: builder.mutation({
      async queryFn({ level = 'LEVEL1', USERNAME, SCORE }) {
        try {
          const leaderboardRef = collection(
            firestoreDatabase,
            `LEVELS/${level}/LEADERBOARD_${level}`
          );
          await addDoc(leaderboardRef, {
            USERNAME,
            SCORE,
          });
          return { data: null };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Firestore'],
    }),
    fetchLevelLeaderboard: builder.query({
      async queryFn(level) {
        try {
          const ref = collection(
            firestoreDatabase,
            `LEVELS/${level}/LEADERBOARD_${level}`
          );
          const q = query(ref, orderBy('SCORE'));
          const querySnapshot = await getDocs(q);
          const leaderboard = [];
          querySnapshot?.forEach((doc) => {
            leaderboard.push(doc.data());
          });
          return { data: leaderboard };
        } catch (error) {
          console.error(error.message);
          console.log('why');
          return { error: error.message };
        }
      },
      providesTags: ['Firestore'],
    }),
  }),
});

export const {
  useFetchLevelCharactersQuery,
  useUpdateLevelLeaderboardMutation,
  useFetchLevelLeaderboardQuery,
} = firestoreApi;
