import React, { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './index.less';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }),
);

const UpLoadArticleTitleImage: FC = () => {
    const classes = useStyles();
    const classname = 'upload-article-title-image';
    return (
        <div className={classname}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <div className='upload'>上传题图</div>
            </label>
            <div>
                <Button color='primary'>下一步</Button>
                <Button color='default'>跳过</Button>
            </div>
        </div>
    );
};

export default UpLoadArticleTitleImage;