import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import {
	doc,
	setDoc,
	addDoc,
	getDocs,
	getDoc,
	updateDoc,
	arrayUnion,
	collection,
	getFirestore
} from 'firebase/firestore';
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

import type { DocumentData } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBxdasPWGQy17nZEUVcjk0sD2ivhAD1I3w',
	authDomain: 'codenight-dev-challenges.firebaseapp.com',
	projectId: 'codenight-dev-challenges',
	storageBucket: 'codenight-dev-challenges.appspot.com',
	messagingSenderId: '288465614232',
	appId: '1:288465614232:web:9e53c659515801d60467ed',
	measurementId: 'G-YQ3DPD3WFC'
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const loginWithGitHub = () => {
	const provider = new GithubAuthProvider();
	return signInWithPopup(auth, provider);
};

auth.onAuthStateChanged((user) => {
	if (!user) {
		return;
	}

	const usersRef = collection(db, 'users');
	const userRef = doc(usersRef, user.uid);

	setDoc(userRef, {
		uid: user.uid,
		name: user.displayName,
		email: user.email,
		photoURL: user.photoURL
	});
});

export async function addChallenge(
	challenge: {
		title: string;
		description: string;
		difficulty: string;
	},
	image: File
) {
	// TODO: createdAt, updatedAt
	const userId = auth.currentUser?.uid;
	if (!userId) {
		throw new Error('User not logged in');
	}

	const imagePath = await uploadImage(image);
	const challengeDoc = {
		...challenge,
		image: imagePath,
		createdBy: userId
	};

	const challengesRef = collection(db, 'challenges');
	const docRef = await addDoc(challengesRef, challengeDoc);
	console.log('Document written with ID: ', docRef.id);
}

async function uploadImage(file: File): Promise<string> {
	const imageRef = storageRef(storage, `images/${file.name}-${Date.now()}-${file.size}`);
	const res = await uploadBytes(imageRef, file);
	return res.metadata.fullPath;
}

async function getImageUrl(path: string): Promise<string> {
	const storage = getStorage(app);
	const imageRef = storageRef(storage, path);
	return getDownloadURL(imageRef);
}

export async function getChallenges(): Promise<
	DocumentData &
		{
			id: string;
			image: string | null;
			createdBy: DocumentData | null;
		}[]
> {
	const challengesRef = collection(db, 'challenges');
	const snapshot = await getDocs(challengesRef);
	const docs = snapshot.docs.map((doc) => {
		return {
			id: doc.id,
			data: doc.data()
		};
	});

	const images = await Promise.all(docs.map(({ data }) => getImageUrl(data.image)));
	const users = await Promise.all(docs.map(({ data }) => getUser(data.createdBy)));

	return docs.map(({ id, data }, i) => ({
		...data,
		id,
		image: images[i],
		createdBy: users[i]
	}));
}

export async function getUser(userId: string): Promise<DocumentData | null> {
	const usersRef = collection(db, 'users');
	const userRef = doc(usersRef, userId);
	const doc_ = await getDoc(userRef);

	if (!doc_.exists()) {
		return null;
	}

	return doc_.data();
}

export async function upvoteChallenge(challengeId: string) {
	const userId = auth.currentUser?.uid;

	if (!userId) {
		throw new Error('User not logged in');
	}
	const challengesRef = collection(db, 'challenges');
	const challengeRef = doc(challengesRef, challengeId);
	const doc_ = await getDoc(challengeRef);

	if (!doc_.exists()) {
		throw new Error('Challenge not found');
	}
	const data = doc_.data();
	const upvotes = data.upvotes || [];

	if (upvotes.includes(userId)) {
		throw new Error('Challenge already upvoted');
	}
	await updateDoc(challengeRef, {
		upvotes: arrayUnion(userId)
	});
}
