import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const { attachmentUrl } = nweetObj;
    const onDeleteClick = async (e) => {
        const ok = window.confirm(
            "Are you sure you want to delete this nweet?",
        );
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl !== "") {
                await storageService
                    .refFromURL(nweetObj.attachmentUrl)
                    .delete();
            }
        }
    };
    const toggleEditing = () => {
        setEditing((prev) => !prev);
        setNewNweet(nweetObj.text);
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewNweet(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            {" "}
                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    value={newNweet}
                                    onChange={onChange}
                                    required
                                />
                                <input type="submit" value="Update Nweet" />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {attachmentUrl && (
                        <img
                            src={attachmentUrl}
                            width="50px"
                            height="50px"
                            alt={attachmentUrl}
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Nweet
                            </button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
