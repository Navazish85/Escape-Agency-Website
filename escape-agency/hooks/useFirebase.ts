import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export type TImage = 'image1' | 'image2' | 'image3' | 'bg';
export type TNews = 'title' | 'description';
export type TTeamKey = 'name' | 'role' | 'img_url' | 'id';
export type TTeam = Record<TTeamKey, string>;

export type TPlayer =
  | 'age'
  | 'bio'
  | 'country'
  | 'image1'
  | 'image2'
  | 'lane'
  | 'name'
  | 'video_url'
  | 'id';

export type TPlayerList = Record<TPlayer, string>[];

const useFirebase = () => {
  const getHomePics = async () => {
    const images: Record<TImage, string> = {
      image1: '',
      image2: '',
      image3: '',
      bg: '',
    };
    const blogsRef = collection(db, 'home_images');
    const blogsSnap = await getDocs(blogsRef);
    blogsSnap.forEach((doc) => {
      images['image1'] = doc.data().image1;
      images['image2'] = doc.data().image2;
      images['image3'] = doc.data().image3;
      images['bg'] = doc.data().bg;
    });

    return images;
  };

  const handleUpdateImage = async ({
    image1,
    image2,
    image3,
    bg,
  }: Record<'image1' | 'image2' | 'image3' | 'bg', string>) => {
    const astroCollection = query(
      collection(db, 'home_images'),
      where('id', '==', '1')
    );

    return getDocs(astroCollection).then((snapshot) => {
      snapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          image1,
          image2,
          image3,
          bg,
        });
      });
    });
  };

  const handleSubmitNews = async ({
    title,
    description,
  }: Record<'title' | 'description', string>) => {
    return addDoc(collection(db, 'news'), {
      title,
      description,
    });
  };

  const getNews = async () => {
    const news: Record<TNews, string>[] = [];
    const blogsRef = collection(db, 'news');
    const blogsSnap = await getDocs(blogsRef);
    blogsSnap.forEach((doc) => {
      const title = doc.data().title;
      const description = doc.data().description;
      console.log('title = ', doc.data());
      if (title && description) news.push({ title, description });
    });

    return news;
  };

  const deleteNews = async ({ title, description }: Record<TNews, string>) => {
    const astroCollection = query(
      collection(db, 'news'),
      where('title', '==', title),
      where('description', '==', description)
    );
    return getDocs(astroCollection).then((snapshot) => {
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  };

  const getPlayers = async () => {
    const players: TPlayerList = [];

    const blogsRef = collection(db, 'player');
    const blogsSnap = await getDocs(blogsRef);
    blogsSnap.forEach((doc) => {
      console.log('doc = ', doc.data());
      const name = doc.data().name;
      const age = doc.data().age;
      if (name && age) players.push(doc.data() as Record<TPlayer, string>);
    });

    return players;
  };

  const handleSubmitPlayer = async (data: Record<TPlayer, string>) => {
    return addDoc(collection(db, 'player'), {
      ...data,
    });
  };

  const deletePlayer = async (id: string) => {
    const astroCollection = query(
      collection(db, 'player'),
      where('id', '==', id)
    );
    return getDocs(astroCollection).then((snapshot) => {
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  };

  const getTeams = async () => {
    const teams: TTeam[] = [];

    const blogsRef = collection(db, 'team');
    const blogsSnap = await getDocs(blogsRef);
    blogsSnap.forEach((doc) => {
      teams.push(doc.data() as TTeam);
    });
    return teams;
  };

  const handleSubmitTeam = async (data: TTeam) => {
    return addDoc(collection(db, 'team'), {
      ...data,
    });
  };

  const deleteTeam = async (id: string) => {
    const astroCollection = query(
      collection(db, 'team'),
      where('id', '==', id)
    );
    return getDocs(astroCollection).then((snapshot) => {
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  };

  return {
    getHomePics,
    handleUpdateImage,
    handleSubmitNews,
    getNews,
    deleteNews,
    getPlayers,
    handleSubmitPlayer,
    deletePlayer,
    getTeams,
    handleSubmitTeam,
    deleteTeam,
  };
};

export default useFirebase;
