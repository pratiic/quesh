import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./solution-container.module.scss";

import { getCurrentUser } from "../../local-storage/current-user";

import PageHeader from "../page-header/page-header";
import PostDetails from "../post-details/post-details";
import ImageList from "../image-list/image-list";
import Button from "../button/button";
import SolutionMenu from "./solution-menu/solution-menu";

const SolutionContainer = ({
	solution,
	title = true,
	showContentToggler = false,
}) => {
	const [showImages, setShowImages] = useState(!showContentToggler);

	const {
		_id: solutionID,
		author,
		createdAt,
		description,
		images,
	} = solution;

	const currentUser = getCurrentUser();

	const imageListAnimation = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	const renderContentToggler = () => {
		return (
			<Button
				type="tertiary"
				arrowDirection={showImages ? "up" : "down"}
				clickHandler={toggleShowImages}
			>
				{showImages ? "hide images" : "show images"}
			</Button>
		);
	};

	const toggleShowImages = () => {
		setShowImages(!showImages);
	};

	return (
		<div>
			{title && (
				<PageHeader
					title="solution to the question"
					capFirst
					muted
					backArrow={false}
				/>
			)}

			<PostDetails
				{...{
					author,
					createdAt,
					description,
					menu: currentUser._id === author._id && (
						<SolutionMenu solutionID={solutionID} />
					),
				}}
			/>

			<div className={styles.divider}></div>

			{showContentToggler && images.length > 0 && renderContentToggler()}

			<AnimatePresence
				initial={false}
				exitBeforeEnter={true}
				onExitComplete={() => null}
			>
				{showImages && (
					<motion.div
						className={styles.imageList}
						variants={imageListAnimation}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<div className={styles.divider}></div>
						<ImageList list={images} title="solution images" />
					</motion.div>
				)}
			</AnimatePresence>

			{showContentToggler && <div className={styles.dividerBigger}></div>}
		</div>
	);
};

export default SolutionContainer;