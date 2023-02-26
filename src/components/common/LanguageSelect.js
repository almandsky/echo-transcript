import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";


const LanguageSelect = ({ onChange, value, disabled }) => {
    return (
        <>
            <InputLabel id="language-select-label" variant="standard">Language</InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                label="Language"
                onChange={onChange}
                disabled={disabled}
                value={value}
            >
                <MenuItem value="ar-SA">Arabic Saudi Arabia</MenuItem>
                <MenuItem value="cs-CZ">Czech Czech Republic</MenuItem>
                <MenuItem value="da-DK">Danish Denmark</MenuItem>
                <MenuItem value="de-DE">German Germany</MenuItem>
                <MenuItem value="el-GR">Modern Greek Greece</MenuItem>
                <MenuItem value="en-AU">English (Australia)</MenuItem>
                <MenuItem value="en-GB">English (United Kingdom)</MenuItem>
                <MenuItem value="en-IE">English (Ireland)</MenuItem>
                <MenuItem value="en-US">English (United States)</MenuItem>
                <MenuItem value="en-ZA">English (South Africa)</MenuItem>
                <MenuItem value="es-ES">Spanish (Spain)</MenuItem>
                <MenuItem value="es-MX">Spanish (Mexico)</MenuItem>
                <MenuItem value="fi-FI">Finnish Finland</MenuItem>
                <MenuItem value="fr-CA">French (Canada)</MenuItem>
                <MenuItem value="fr-FR">French (France)</MenuItem>
                <MenuItem value="he-IL">Hebrew Israel</MenuItem>
                <MenuItem value="hi-IN">Hindi India</MenuItem>
                <MenuItem value="hu-HU">Hungarian Hungary</MenuItem>
                <MenuItem value="id-ID">Indonesian Indonesia</MenuItem>
                <MenuItem value="it-IT">Italian Italy</MenuItem>
                <MenuItem value="ja-JP">Japanese Japan</MenuItem>
                <MenuItem value="ko-KR">Korean Republic of Korea</MenuItem>
                <MenuItem value="nl-BE">Dutch Belgium</MenuItem>
                <MenuItem value="nl-NL">Dutch Netherlands</MenuItem>
                <MenuItem value="no-NO">Norwegian Norway</MenuItem>
                <MenuItem value="pl-PL">Polish Poland</MenuItem>
                <MenuItem value="pt-BR">Portuguese Brazil</MenuItem>
                <MenuItem value="pt-PT">Portuguese Portugal</MenuItem>
                <MenuItem value="ro-RO">Romanian Romania</MenuItem>
                <MenuItem value="ru-RU">Russian Russian Federation</MenuItem>
                <MenuItem value="sk-SK">Slovak Slovakia</MenuItem>
                <MenuItem value="sv-SE">Swedish Sweden</MenuItem>
                <MenuItem value="th-TH">Thai Thailand</MenuItem>
                <MenuItem value="tr-TR">Turkish Turkey</MenuItem>
                <MenuItem value="zh-CN">Chinese (China)</MenuItem>
                <MenuItem value="zh-HK">Chinese (Hong Kong)</MenuItem>
                <MenuItem value="zh-TW">Chinese (Taiwan)</MenuItem>
            </Select>
        </>
    );
};

LanguageSelect.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default LanguageSelect;
