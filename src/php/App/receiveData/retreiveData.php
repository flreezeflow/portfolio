<?php

declare(strict_types=1);

namespace App\receiveData;

use App\handleData\handleTextData,
    App\exceptions\dataNotSet;
use App\handleData\handleUploadedFiles;

class retreiveData {
    protected $name;
    protected $email;
    protected $body;
    protected $handleTextData;

    protected function setData(): array {
        $count = 0;
        $messages = [];

        if (isset($_POST['email'])) {
            $this->name = $this->sanitizeString($_POST['name']);
            $this->email = $this->sanitizeString($_POST['email']);
            $this->body = $this->sanitizeString($_POST['body']);
            $this->handleTextData = new handleTextData($this->name, $this->body, $this->email);
            $count++;
        }

        if ($count >= 1) {
            return [
                'status' => 'success',
            ];
        } else {
            throw new dataNotSet();
        }
    }

    private function sanitizeString(string $input): string {
        return htmlspecialchars(strip_tags(trim($input)));
    }
}