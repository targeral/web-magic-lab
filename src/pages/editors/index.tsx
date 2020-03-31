import React, { FC, useState } from 'react';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';
import ArticleTitleImage from './articleTitleImage';
import ArticleEditor from './articleEditor';
import { Button } from '@material-ui/core';
import { useTheme, makeStyles, ThemeProvider} from '@material-ui/styles';

enum Step {
    select_image,
    editor
};

interface Props {
    color: string;
    background: string;
}

const src = 'https://m801.music.126.net/20191011200033/14f4cba5c4aadcfe550d84b54f960b1c/jdyyaac/040e/540f/0f0c/3d6d45a11ece626026b28fbf4223cdb8.m4a';

const ArticleEditorUI: FC = () => {
    const [step, setStep] = useState<Step>(Step.select_image);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const classname = 'editor';
    const useStyle = makeStyles({
        button: (props: Props) => ({
            color: props.color,
            background: props.background
        })
    });
    const props = {color: 'red', background: '#ccc'};
    const classes = useStyle(props);

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url: 'http://www.zombo.com' }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const contentStateWithLink = Modifier.applyEntity(
        contentStateWithEntity,
        selection,
        entityKey
    );

    const theme = {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    };
    return (
        <ThemeProvider theme={theme}>
            <div className={classname}>
                <audio src={src} controls></audio>
                {/* <Button onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))} className={classes.button}>Bold</Button>
                <Editor
                    editorState={editorState}
                    onChange={(editorState) => {setEditorState(editorState);console.log(editorState)}}
                    handleKeyCommand={handleKeyCommand}
                /> */}
            </div>
        </ThemeProvider>
    );
};

export default ArticleEditorUI;