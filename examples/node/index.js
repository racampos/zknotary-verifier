import * as wasm from "zknotary-verifier";
import { twitter } from "zknotary-parsers";
import fs from 'fs/promises';

async function readFile(file) {
    try {
        const proof = await fs.readFile(file, 'utf8');
        return proof;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

const proof_json = await readFile('./sample_proof.json');
const notary_pubkey = await readFile('./notary.pub');

try {
    const result = wasm.verify(proof_json, notary_pubkey);
    // console.log(result);
    const parsedData = twitter.parse(result);
    console.log(JSON.stringify(parsedData, null, 2));
} catch (e) {
    console.error("Verification failed:", e);
}
